import { Schema, model } from 'mongoose';
import { IStudent } from '../../interfaces';
import { Roles } from '../enums/roles.enum';

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
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  enrolledCourses: {
    type: [String],
    default: [],
  },
});

export const Student = model<IStudent>('Student', studentSchema);
