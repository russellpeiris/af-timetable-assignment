import { Router } from 'express';
import {
  adminCreateCourse,
  adminDeleteCourse,
  adminGetAllCourses,
  adminGetCourse,
  adminUpdateCourse,
} from '../controllers/admin.controller';

const adminRoutes = Router();

adminRoutes.post('/courses', adminCreateCourse);
adminRoutes.patch('/courses/:id', adminUpdateCourse);
adminRoutes.delete('/courses/:id', adminDeleteCourse);
adminRoutes.get('/courses', adminGetAllCourses);
adminRoutes.get('/courses/:id', adminGetCourse);

export default adminRoutes;
