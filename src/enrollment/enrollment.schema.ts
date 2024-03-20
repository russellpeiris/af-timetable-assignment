import { Schema, model } from 'mongoose';
import Course from '../course/course.schema';
import { Student } from '../student/student.schema';
import { IStudentEnrollment } from './enrollment.interface';

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
