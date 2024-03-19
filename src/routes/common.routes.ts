import { Router } from 'express';
import {
  enrollInCourse,
  unEnrollFromCourse,
} from '../controllers/student.controller';
import { getTimetableByCourseCode } from '../controllers/timetableController';

const commonRoutes = Router();
commonRoutes.post('/enroll', enrollInCourse);
commonRoutes.post('/unenroll', unEnrollFromCourse);
commonRoutes.get('/timeTable/:courseCode', getTimetableByCourseCode);

export default commonRoutes;
