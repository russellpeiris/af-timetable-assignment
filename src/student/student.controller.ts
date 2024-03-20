import { Request, Response } from 'express';
import { logger } from '..';
import Course from '../course/course.schema';
import StudentEnrollment from '../enrollment/enrollment.schema';
import User from '../user/user.schema';
import { IStudent } from '../user/users.interface';
import { Student } from './student.schema';

async function createStudent(student: IStudent): Promise<IStudent> {
  try {
    const { nic, role, username, name, password, sId } = student;
    const isExist = await Student.findOne({ sId });
    if (isExist) {
      throw new Error(`Student with sId: ${sId} already exists`);
    }
    const newStudent = await Student.create(student);
    if (newStudent) {
      await User.create({ nic, role, username, name, password });
    }
    return newStudent;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export { createStudent };
