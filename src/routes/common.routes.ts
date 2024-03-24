import { Router } from 'express';
import {
  enrollInCourse,
  unEnrollFromCourse,
} from '../enrollment/enrollment.controller';
import { getTimetableByCourseCode } from '../timetable/timetable.controller';
import { adminGetAllCourses, adminGetCourse } from '../admin/admin.controller';

const commonRoutes = Router();

commonRoutes.post('/enroll', enrollInCourse);
commonRoutes.post('/unenroll', unEnrollFromCourse);
commonRoutes.get('/timeTable/:courseCode', getTimetableByCourseCode);
commonRoutes.get('/courses/:id', adminGetCourse); // Get a specific course by ID
commonRoutes.get('/courses', adminGetAllCourses); // Get all courses

export default commonRoutes;
