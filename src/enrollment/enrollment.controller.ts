import { Request, Response } from 'express';
import { logger } from '..';
import Course from '../course/course.schema';
import { Student } from '../student/student.schema';
import StudentEnrollment from './enrollment.schema';

async function enrollInCourse(req: Request, res: Response) {
  try {
    const { sId, courseCode } = req.body;
    const student = await Student.findOne({ sId }).populate('enrolledCourses');
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
      return res.status(400).json({
        message: `Student already enrolled in course: ${courseCode}`,
        student,
      });
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
      .json({ message: `Student enrolled in course: ${courseCode}`, student });
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
      return res.status(400).json({
        message: `Student not enrolled in course: ${courseCode}`,
        student,
      });
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
    const updatedStudent = await Student.findOneAndUpdate(
      { sId },
      {
        $pull: { enrolledCourses: course._id },
      },
      { new: true },
    );
    return res.status(200).json({
      message: `Student unenrolled from course: ${courseCode}`,
      updatedStudent,
    });
  } catch (error: any) {
    console.error(error.message);
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function getAllEnrollments(req: Request, res: Response) {
  try {
    const enrollments = await StudentEnrollment.find()
      .populate({ path: 'student', select: 'sId' })
      .populate({ path: 'course', select: 'courseCode' });
    return res.status(200).json({ enrollments });
  } catch (error: any) {
    console.error(error.message);
    logger.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export { enrollInCourse, unEnrollFromCourse, getAllEnrollments };
