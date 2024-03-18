import { Router } from 'express';
import { adminCreateCourse } from '../controllers/admin.controller';

const adminRoutes = Router();

adminRoutes.post('/courses', adminCreateCourse);

export default adminRoutes;
