import { IStudent } from '../../interfaces';
import { Student } from '../schemas/student.schema';
import User from '../schemas/user.schema';

export async function createStudent(student: IStudent): Promise<IStudent> {
  try {
    const { nic, role, username, name, password, sId } = student;
    const isExist = await Student.findOne({ sId });
    if (isExist) {
      throw new Error(`Student with sId: ${sId} already exists`);
    }
    const newStudent = await Student.create(student);
    if (newStudent) {
      await User.create({ nic, role, username, name, password });
    }
    return newStudent;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
