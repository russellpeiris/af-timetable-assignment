import User from '../user/user.schema';
import { IFaculty } from '../user/users.interface';
import Faculty from './faculty.schema';

async function createFaculty(faculty: IFaculty): Promise<IFaculty> {
  try {
    const { nic, role, username, name, password, fId } = faculty;
    const isExist = await Faculty.findOne({ fId });
    if (isExist) {
      throw new Error(`Faculty with fId: ${fId} already exists`);
    }
    const newFaculty = await Faculty.create(faculty);
    if (newFaculty) {
      await User.create({ nic, role, username, name, password });
    }
    return newFaculty;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export { createFaculty };
