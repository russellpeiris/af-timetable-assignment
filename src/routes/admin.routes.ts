import { Router } from 'express';
import {
  adminCreateCourse,
  adminDeleteCourse,
  adminGetAllCourses,
  adminGetCourse,
  adminUpdateCourse,
} from '../admin/admin.controller';
import { createResource } from '../resource/resource.controller';
import { createClassRoom } from '../classroom/room.controller';
import {
  addSessionToTimetable,
  createTimetable,
  deleteSessionFromTimetable,
  deleteTimetable,
  updateTimetableSession,
} from '../timetable/timetable.controller';

const adminRoutes = Router();

adminRoutes.post('/courses', adminCreateCourse);
adminRoutes.patch('/courses/:id', adminUpdateCourse);
adminRoutes.delete('/courses/:id', adminDeleteCourse);
adminRoutes.get('/courses', adminGetAllCourses);
adminRoutes.get('/courses/:id', adminGetCourse);
adminRoutes.post('/timeTable', createTimetable);
adminRoutes.delete('/timeTable/:courseCode', deleteTimetable);
adminRoutes.post('/timeTable/:courseCode', addSessionToTimetable);
adminRoutes.patch('/timeTable/session/:sessionId', updateTimetableSession);
adminRoutes.delete(
  '/timeTable/session/:courseCode/:sessionId',
  deleteSessionFromTimetable,
);
adminRoutes.post('/rooms', createClassRoom);
adminRoutes.post('/resource', createResource);

export default adminRoutes;
