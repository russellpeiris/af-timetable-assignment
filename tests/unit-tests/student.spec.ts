import { mocked } from 'jest-mock';
import { createStudent } from '../../src/student/student.controller';
import { Student } from '../../src/student/student.schema';
import User from '../../src/user/user.schema';
import { Schema } from 'mongoose';

// Mock the models
jest.mock('../../src/user/user.schema');
jest.mock('../../src/student/student.schema');

describe('createStudent', () => {
  const mockFacultyId = new Schema.Types.ObjectId('someFacultyId');
  const mockCourseId1 = new Schema.Types.ObjectId('someCourseId1');
  const mockCourseId2 = new Schema.Types.ObjectId('someCourseId2');

  const mockStudent = {
    nic: '123456789V',
    role: 'STUDENT',
    username: 'john.doe',
    name: 'John Doe',
    password: 'password123',
    sId: 'S001',
    faculty: mockFacultyId,
    year: 1,
    semester: 1,
  } as any;

  const mockCreatedStudent = {
    ...mockStudent,
    _id: 'someMongoId',
  } as any;

  const mockCreatedUser = {
    nic: mockStudent.nic,
    role: mockStudent.role,
    username: mockStudent.username,
    name: mockStudent.name,
    password: mockStudent.password,
    _id: 'someOtherMongoId',
  } as any;

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should create a new student', async () => {
    // Mocking findOne to return null, indicating the student doesn't exist
    mocked(Student.findOne).mockResolvedValue(null);

    // Mocking the create method of Student to return the mockCreatedStudent
    mocked(Student.create).mockResolvedValue(mockCreatedStudent);

    // Mocking the create method of User to return the mockCreatedUser
    mocked(User.create).mockResolvedValue(mockCreatedUser);

    const result = await createStudent(mockStudent);

    expect(result).toEqual(mockCreatedStudent);
    expect(Student.findOne).toHaveBeenCalledWith({ sId: mockStudent.sId });
    expect(Student.create).toHaveBeenCalledWith(mockStudent);
    expect(User.create).toHaveBeenCalledWith({
      nic: mockStudent.nic,
      role: mockStudent.role,
      username: mockStudent.username,
      name: mockStudent.name,
      password: mockStudent.password,
    });
  });

  it('should throw an error if student with sId already exists', async () => {
    // Mocking findOne to return a value, indicating the student already exists
    mocked(Student.findOne).mockResolvedValue(mockCreatedStudent);

    await expect(createStudent(mockStudent)).rejects.toThrow(
      `Student with sId: ${mockStudent.sId} already exists`,
    );

    expect(Student.findOne).toHaveBeenCalledWith({ sId: mockStudent.sId });
    expect(Student.create).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
  });

  it('should throw an error if any error occurs during creation', async () => {
    // Mocking findOne to return null, indicating the student doesn't exist
    mocked(Student.findOne).mockResolvedValue(null);

    // Mocking the create method of Student to throw an error
    mocked(Student.create).mockRejectedValue(new Error('Database error'));

    await expect(createStudent(mockStudent)).rejects.toThrow('Database error');

    expect(Student.findOne).toHaveBeenCalledWith({ sId: mockStudent.sId });
    expect(Student.create).toHaveBeenCalledWith(mockStudent);
    expect(User.create).not.toHaveBeenCalled();
  });
});
