import { Schema, model } from 'mongoose';
import { IAdmin } from '../../interfaces/users.interface';
import { Roles } from '../enums/roles.enum';

const adminSchema = new Schema<IAdmin>({
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  aId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Admin = model<IAdmin>('Admin', adminSchema);

export default Admin;
