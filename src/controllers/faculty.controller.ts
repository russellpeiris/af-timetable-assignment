import { IFaculty } from '../../interfaces';
import Faculty from '../schemas/faculty.schema';

export async function createFaculty(faculty: IFaculty): Promise<IFaculty> {
  try {
    const newFaculty = await Faculty.create(faculty);
    return newFaculty;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
