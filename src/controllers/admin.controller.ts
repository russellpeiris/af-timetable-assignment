import { Request, Response } from 'express';
import { IAdmin } from '../../interfaces';
import Admin from '../schemas/admin.schema';
import Course from '../schemas/course.schema';
import User from '../schemas/user.schema';
import { logger } from '..';
import { createCourse } from './course.controller';

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

async function adminCreateCourse(req: Request, res: Response) {
  try {
    const newCourse = await createCourse(req.body);
    if (newCourse) {
      return res.status(201).json({ message: 'Course created successfully' });
    }
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export { createAdmin, adminCreateCourse };
