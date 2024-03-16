import { Document } from 'mongoose';
import { Roles } from '../src/enums/roles.enum';

export interface IUser extends Document {
  nic: string;
  username: string;
  password: string;
  role: Roles;
  name: string;
  comparePassword(password: string): Promise<boolean>;
}

export interface IStudent extends IUser {
  sId: string;
  faculty: string;
  year: number;
  semester: number;
  enrolledCourses: string[];
}

export interface IFaculty extends IUser {
  fId: string;
}

export interface IAdmin extends IUser {
  aId: string;
}
