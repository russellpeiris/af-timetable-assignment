import { ICourse } from '../../interfaces';
import Course from '../schemas/course.schema';

async function createCourse(course: ICourse): Promise<ICourse> {
  try {
    const isExist = await Course.findOne({ code: course.courseCode });
    if (isExist) {
      throw new Error(`Course with code: ${course.courseCode} already exists`);
    }
    const newCourse = new Course(course);
    await newCourse.save();
    return newCourse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export { createCourse };
