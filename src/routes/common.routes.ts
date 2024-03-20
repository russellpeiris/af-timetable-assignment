import { Router } from 'express';
import {
  enrollInCourse,
  unEnrollFromCourse,
} from '../student/student.controller';
import { getTimetableByCourseCode } from '../timetable/timetable.controller';

const commonRoutes = Router();
commonRoutes.post('/enroll', enrollInCourse);
commonRoutes.post('/unenroll', unEnrollFromCourse);
commonRoutes.get('/timeTable/:courseCode', getTimetableByCourseCode);

export default commonRoutes;
