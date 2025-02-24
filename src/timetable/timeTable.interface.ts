import { Document, Schema } from 'mongoose';
import { IRoom } from '../classroom/room.interface';

export interface ITimetable extends Document {
  courseCode: string;
  sessions: ITimetableSession[];
}

export interface ITimetableSession extends Document {
  startTime: string;
  endTime: string;
  day: string;
  room: Schema.Types.ObjectId | IRoom;
  lecturer: string;
}
