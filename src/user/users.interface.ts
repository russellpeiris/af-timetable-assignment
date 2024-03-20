import { Document, Schema } from 'mongoose';
import { ICourse } from '../course/course.interface';
import { Roles } from '../enums/roles.enum';

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
  faculty: Schema.Types.ObjectId | IFaculty;
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
