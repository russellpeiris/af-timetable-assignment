import { Document, Schema } from 'mongoose';
import { ICourse } from './course.interface';
import { IStudent } from './users.interface';

export interface IStudentEnrollment {
  student: Schema.Types.ObjectId | IStudent;
  course: Schema.Types.ObjectId | ICourse;
}
