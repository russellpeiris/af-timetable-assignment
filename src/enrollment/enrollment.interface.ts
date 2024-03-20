import { Schema } from 'mongoose';
import { ICourse } from '../course/course.interface';
import { IStudent } from '../user/users.interface';

export interface IStudentEnrollment {
  student: Schema.Types.ObjectId | IStudent;
  course: Schema.Types.ObjectId | ICourse;
}
