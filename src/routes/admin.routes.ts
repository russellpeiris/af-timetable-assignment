import { Router } from 'express';
import {
  adminCreateCourse,
  adminDeleteCourse,
  adminUpdateCourse,
} from '../admin/admin.controller';
import {
  createClassRoom,
  getAllClassRooms,
} from '../classroom/room.controller';
import { getAllEnrollments } from '../enrollment/enrollment.controller';
import {
  assignResourceToRoom,
  createResource,
  unassignResourceFromRoom,
} from '../resource/resource.controller';
import {
  addSessionToTimetable,
  createTimetable,
  deleteSessionFromTimetable,
  deleteTimetable,
  updateTimetableSession,
} from '../timetable/timetable.controller';

const adminRoutes = Router();

// Courses routes
adminRoutes.post('/courses', adminCreateCourse); // Create a new course
adminRoutes.patch('/courses/:id', adminUpdateCourse); // Update a course
adminRoutes.delete('/courses/:id', adminDeleteCourse); // Delete a course

// Timetable routes
adminRoutes.post('/timeTable', createTimetable); // Create a new timetable
adminRoutes.delete('/timeTable/:courseCode', deleteTimetable); // Delete a timetable
adminRoutes.post('/timeTable/:courseCode', addSessionToTimetable); // Add a session to a timetable
adminRoutes.patch('/timeTable/session/:sessionId', updateTimetableSession); // Update a session in a timetable
adminRoutes.delete(
  '/timeTable/session/:courseCode/:sessionId',
  deleteSessionFromTimetable,
); // Delete a session from a timetable

// Rooms and Resources routes
adminRoutes.post('/rooms', createClassRoom); // Create a new classroom
adminRoutes.get('/rooms', getAllClassRooms); // Get all classrooms
adminRoutes.post('/resource', createResource); // Create a new resource
adminRoutes.post('/resource/assign', assignResourceToRoom); // Assign a resource to a classroom
adminRoutes.post('/resource/unassign', unassignResourceFromRoom); // Unassign a resource from a classroom

// Enrollment routes
adminRoutes.get('/enrollments', getAllEnrollments); // Get all enrollments

export default adminRoutes;
