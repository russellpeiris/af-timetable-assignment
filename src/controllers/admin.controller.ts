import { IAdmin } from '../../interfaces';
import Admin from '../schemas/admin.schema';

export async function createAdmin(admin: IAdmin): Promise<IAdmin> {
  try {
    const newAdmin = await Admin.create(admin);
    return newAdmin;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
