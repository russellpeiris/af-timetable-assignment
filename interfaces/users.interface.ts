import { Document, Schema } from 'mongoose';
import { Roles } from '../src/enums/roles.enum';
import { ICourse } from './course.interface';

export interface IUser extends Document {
  nic: string;
  username: string;
  password: string;
  role: Roles;
  name: string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IStudent extends Omit<IUser, 'comparePassword'> {
  sId: string;
  faculty: string;
  year: number;
  semester: number;
  enrolledCourses: Schema.Types.ObjectId[] | ICourse[];
}

export interface IFaculty extends Omit<IUser, 'comparePassword'> {
  fId: string;
}

export interface IAdmin extends Omit<IUser, 'comparePassword'> {
  aId: string;
}
