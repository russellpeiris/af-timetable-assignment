import { IStudent } from '../../interfaces';
import { Student } from '../schemas/student.schema';

export async function createStudent(student: IStudent): Promise<IStudent> {
  try {
    const newStudent = await Student.create(student);
    return newStudent;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
