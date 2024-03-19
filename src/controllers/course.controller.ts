import { ICourse } from '../../interfaces';
import Course from '../schemas/course.schema';
import Faculty from '../schemas/faculty.schema';

async function createCourse(course: ICourse): Promise<ICourse> {
  try {
    const faculty = await Faculty.findOne({ fId: course.faculty });
    if (!faculty) {
      throw new Error(`Faculty with fId: ${course.faculty} not found`);
    }
    course.faculty = faculty._id;
    const isExist = await Course.findOne({ courseCode: course.courseCode });
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

async function getAllCourses(): Promise<ICourse[]> {
  try {
    const courses = await Course.find().populate('faculty');
    return courses;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function getCourseById(courseCode: string): Promise<ICourse | null> {
  try {
    const course = await Course.findOne({ courseCode }).populate('faculty');
    if (!course) {
      throw new Error(`Course with code: ${courseCode} not found`);
    }
    return course;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function updateCourse(
  courseCode: string,
  updatedCourse: Partial<ICourse>,
): Promise<ICourse | null> {
  try {
    const course = await Course.findOneAndUpdate(
      { courseCode },
      { $set: updatedCourse },
      { new: true },
    );
    if (!course) {
      throw new Error(`Course with code: ${courseCode} not found`);
    }
    return course;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function deleteCourse(courseCode: string): Promise<void> {
  try {
    const isDeleted = await Course.findOneAndDelete({ courseCode });
    if (!isDeleted) {
      throw new Error(`Course with code: ${courseCode} not found`);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
};
