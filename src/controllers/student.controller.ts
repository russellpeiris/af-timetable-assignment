import { Request, Response } from 'express';
import { logger } from '..';
import { IStudent } from '../../interfaces';
import Course from '../schemas/course.schema';
import StudentEnrollment from '../schemas/enrollment.schema';
import { Student } from '../schemas/student.schema';
import User from '../schemas/user.schema';

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

async function enrollInCourse(req: Request, res: Response) {
  try {
    const { sId, courseCode } = req.body;
    const student = await Student.findOne({ sId });
    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with sId: ${sId} not found` });
    }
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with code: ${courseCode} not found` });
    }
    const isEnrolled = await Student.findOne({
      sId,
      enrolledCourses: course._id,
    });
    if (isEnrolled) {
      return res
        .status(400)
        .json({ message: `Student already enrolled in course: ${courseCode}` });
    }

    const enroll = await StudentEnrollment.create({
      student: student._id,
      course: course._id,
    });
    if (!enroll) {
      return res
        .status(500)
        .json({ message: 'Failed to enroll student in course' });
    }

    student.enrolledCourses.push(course._id);
    await student.save();
    return res
      .status(200)
      .json({ message: `Student enrolled in course: ${courseCode}` });
  } catch (error: any) {
    console.error(error.message);
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function unEnrollFromCourse(req: Request, res: Response) {
  try {
    const { sId, courseCode } = req.body;
    const student = await Student.findOne({ sId });
    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with sId: ${sId} not found` });
    }
    const course = await Course.findOne({ courseCode });
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with code: ${courseCode} not found` });
    }
    const isEnrolled = await Student.findOne({
      sId,
      enrolledCourses: course._id,
    });
    if (!isEnrolled) {
      return res
        .status(400)
        .json({ message: `Student not enrolled in course: ${courseCode}` });
    }

    const enrollment = await StudentEnrollment.findOneAndDelete({
      student: student._id,
      course: course._id,
    });
    if (!enrollment) {
      return res
        .status(500)
        .json({ message: 'Failed to unenroll student from course' });
    }
    await Student.findOneAndUpdate(
      { sId },
      {
        $pull: { enrolledCourses: course._id },
      },
    );

    return res
      .status(200)
      .json({ message: `Student unenrolled from course: ${courseCode}` });
  } catch (error: any) {
    console.error(error.message);
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}
export { createStudent, enrollInCourse, unEnrollFromCourse };
