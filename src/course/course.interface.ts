import { Document, Schema } from 'mongoose';
import { IFaculty } from '../user/users.interface';

export interface ICourse extends Document {
  name: string;
  courseCode: string;
  credits: number;
  faculty: Schema.Types.ObjectId | IFaculty;
  description: string;
  timeTable: string;
}
