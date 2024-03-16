import { IAdmin } from '../../interfaces';
import Admin from '../schemas/admin.schema';
import User from '../schemas/user.schema';

export async function createAdmin(admin: IAdmin): Promise<IAdmin> {
  try {
    const { nic, role, username, name, password, aId } = admin;
    const isExist = await Admin.findOne({ aId });
    if (isExist) {
      throw new Error(`Admin with aId: ${aId} already exists`);
    }
    const newAdmin = await Admin.create(admin);
    if (newAdmin) {
      await User.create({ nic, role, username, name, password });
    }
    return newAdmin;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
