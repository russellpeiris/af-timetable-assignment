import { Router } from 'express';
import { enrollInCourse } from '../controllers/student.controller';

const commonRoutes = Router();
commonRoutes.post('/enroll', enrollInCourse);

export default commonRoutes;
