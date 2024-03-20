import { Schema, model } from 'mongoose';
import Faculty from '../faculty/faculty.schema';
import { ICourse } from './course.interface';

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
  },
  timeTable: {
    type: String,
  },
});

const Course = model<ICourse>('Course', courseSchema);

export default Course;
