import { Schema, model } from 'mongoose';
import Course from '../course/course.schema';
import Faculty from '../faculty/faculty.schema';
import { IStudent } from '../user/users.interface';

const studentSchema = new Schema<IStudent>({
  nic: {
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
  sId: {
    type: String,
    required: true,
    unique: true,
  },
  faculty: {
    type: String,
    ref: Faculty,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  enrolledCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: Course,
    },
  ],
});

export const Student = model<IStudent>('Student', studentSchema);
