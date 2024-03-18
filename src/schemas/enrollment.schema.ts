import { Schema, model, Document, Types } from 'mongoose';
import { Student } from './student.schema';
import Course from './course.schema';
import { IStudentEnrollment } from '../../interfaces/enrollment.interface';

const studentEnrollmentSchema = new Schema<IStudentEnrollment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: Student,
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: Course,
    required: true,
  },
});

const StudentEnrollment = model<IStudentEnrollment>(
  'StudentEnrollment',
  studentEnrollmentSchema,
);

export default StudentEnrollment;
