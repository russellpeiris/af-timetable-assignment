import { Document, Schema } from 'mongoose';
import { ICourse } from './course.interface';
import { IRoom } from './room.interface';

export interface ITimetable extends Document {
  course: Schema.Types.ObjectId | ICourse;
  time: string;
  day: string;
  room: Schema.Types.ObjectId | IRoom;
  lecturer: string;
}
