import { Schema, model } from 'mongoose'
import { IStudent } from '../../interfaces'

const studentSchema = new Schema<IStudent>({
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
})

const Student = model<IStudent>('Student', studentSchema)
