import { IFaculty } from './../../interfaces/users.interface';
import { Schema, model } from 'mongoose';
import { ICourse } from '../../interfaces';
import Faculty from './faculty.schema';

const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: Faculty,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeTable: {
    type: String,
    required: true,
  },
});

const Course = model<ICourse>('Course', courseSchema);

export default Course;
