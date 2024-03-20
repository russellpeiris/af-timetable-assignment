import { Request, Response } from 'express';
import { logger } from '..';
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from '../course/course.controller';
import User from '../user/user.schema';
import { IAdmin } from '../user/users.interface';
import Admin from './admin.schema';

async function createAdmin(admin: IAdmin): Promise<IAdmin> {
  try {
    const { nic, role, username, name, password, aId } = admin;
    const isExist = await Admin.findOne({ aId });
    if (isExist) {
      throw new Error(`Admin with aId: ${aId} already exists`);
    }
    const newAdmin = await Admin.create(admin);
    if (newAdmin) {
      await User.create({ nic, role, username, name, password });
    }
    return newAdmin;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
// Course
async function adminCreateCourse(req: Request, res: Response) {
  try {
    const newCourse = await createCourse(req.body);
    if (newCourse) {
      return res
        .status(201)
        .json({ message: 'Course created successfully', newCourse });
    }
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function adminUpdateCourse(req: Request, res: Response) {
  try {
    const courseCode = req.params.id;
    const updatedCourse = await updateCourse(courseCode, req.body);
    if (updatedCourse) {
      return res.status(200).json({
        message: 'Course updated successfully',
        course: updatedCourse,
      });
    }
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function adminDeleteCourse(req: Request, res: Response) {
  try {
    const courseCode = req.params.id;
    await deleteCourse(courseCode);
    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error: any) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function adminGetAllCourses(req: Request, res: Response) {
  try {
    const courses = await getAllCourses();
    return res.status(200).json({ courses });
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function adminGetCourse(req: Request, res: Response) {
  try {
    const courseCode = req.params.id;
    const course = await getCourseById(courseCode);
    if (course) {
      return res.status(200).json({ course });
    }
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

// Timetable

export {
  adminCreateCourse,
  adminDeleteCourse,
  adminGetAllCourses,
  adminGetCourse,
  adminUpdateCourse,
  createAdmin,
};
