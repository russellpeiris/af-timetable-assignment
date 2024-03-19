import { Request, Response } from 'express';
import { logger } from '..';
import { ITimetableSession } from '../../interfaces/timeTable.interface';
import Course from '../schemas/course.schema';
import TimeTableSession from '../schemas/session.schema';
import TimeTable from '../schemas/timetable.schema';

async function createTimetable(req: Request, res: Response) {
  try {
    const { courseCode, sessions } = req.body;
    const isCourseExist = await Course.findOne({ courseCode });
    if (!isCourseExist) {
      throw new Error(`Course with code: ${courseCode} not found`);
    }
    const isExist = await TimeTable.findOne({ courseCode });
    if (isExist) {
      throw new Error(`Timetable for course: ${courseCode} already exists`);
    }
    const newTimetable = await TimeTable.create({ courseCode });
    if (sessions && sessions.length > 0) {
      for (const session of sessions) {
        const newSession = await createTimetableSession(session);
        newTimetable.sessions.push(newSession._id);
      }
      await newTimetable.save();
    }
    if (!newTimetable) {
      return res.status(500).json({ message: 'Failed to create timetable' });
    }
    return res.status(201).json(newTimetable);
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function deleteTimetable(req: Request, res: Response) {
  try {
    const { courseCode } = req.params;
    const isExist = await TimeTable.findOne({ courseCode }).populate(
      'sessions',
    );
    if (!isExist) {
      throw new Error(`Timetable for course: ${courseCode} not found`);
    }
    await TimeTable.deleteOne({ courseCode });
    await TimeTableSession.deleteMany({ _id: { $in: isExist.sessions } });

    return res
      .status(200)
      .json({ message: `Timetable for course: ${courseCode} deleted` });
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function addSessionToTimetable(req: Request, res: Response) {
  try {
    const { courseCode } = req.params;
    const { sessionData } = req.body;
    const isExist = await TimeTable.findOne({ courseCode });
    if (!isExist) {
      throw new Error(`Timetable for course: ${courseCode} not found`);
    }
    const newSession = await createTimetableSession(sessionData);
    isExist.sessions.push(newSession._id);
    await isExist.save();
    return res.status(200).json(isExist);
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

async function createTimetableSession(
  sessionData: ITimetableSession,
): Promise<ITimetableSession> {
  try {
    const existingSessions = await TimeTableSession.find({
      day: sessionData.day,
      $or: [
        {
          startTime: { $lt: sessionData.endTime },
          endTime: { $gt: sessionData.startTime },
        },
        {
          startTime: { $eq: sessionData.startTime },
          endTime: { $eq: sessionData.endTime },
        },
      ],
    });

    if (existingSessions.length > 0) {
      throw new Error(
        'Timetable conflict: There is already a session scheduled at this time',
      );
    }

    const newSession = await TimeTableSession.create(sessionData);
    return newSession;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function updateTimetableSession(req: Request, res: Response) {
  try {
    const { sessionId } = req.params;
    const { updatedSessionData } = req.body;
    const existingSession = await TimeTableSession.findById(sessionId);
    if (!existingSession) {
      return res.status(404).json({
        message: `Session with id: ${sessionId} not found`,
      });
    }

    const overlappingSessions = await TimeTableSession.find({
      _id: { $ne: sessionId },
      day: existingSession.day,
      $or: [
        {
          startTime: { $lt: updatedSessionData.endTime },
          endTime: { $gt: updatedSessionData.startTime },
        },
        {
          startTime: { $eq: updatedSessionData.startTime },
          endTime: { $eq: updatedSessionData.endTime },
        },
      ],
    });

    if (overlappingSessions.length > 0) {
      return res.status(400).json({
        message:
          'Timetable conflict: There is already a session scheduled at this time',
      });
    }

    const updatedSession = await TimeTableSession.findByIdAndUpdate(
      sessionId,
      updatedSessionData,
      { new: true },
    );
    return res.status(200).json(updatedSession);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function deleteSessionFromTimetable(req: Request, res: Response) {
  try {
    const { sessionId, courseCode } = req.params;
    const timetable = await TimeTable.findOne({ courseCode });
    if (!timetable) {
      return res.status(404).json({
        message: `Timetable for course: ${courseCode} not found`,
      });
    }
    await TimeTable.findOneAndUpdate(
      { courseCode },
      { $pull: { sessions: sessionId } },
    );
    const existingSession = await TimeTableSession.findById(sessionId);
    if (!existingSession) {
      return res.status(404).json({
        message: `Session with id: ${sessionId} not found`,
      });
    }
    await TimeTableSession.deleteOne({ _id: sessionId });
    return res.status(200).json({
      message: `Session with id: ${sessionId} deleted from sessions`,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function getTimetableByCourseCode(req: Request, res: Response) {
  try {
    const { courseCode } = req.params;
    const timetable = await TimeTable.findOne({ courseCode }).populate(
      'sessions',
    );
    if (!timetable) {
      return res.status(404).json({
        message: `Timetable for course: ${courseCode} not found`,
      });
    }
    return res.status(200).json(timetable);
  } catch (error: any) {
    logger.error(error.message);
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
}

export {
  createTimetable,
  updateTimetableSession,
  deleteTimetable,
  addSessionToTimetable,
  deleteSessionFromTimetable,
  getTimetableByCourseCode,
};
