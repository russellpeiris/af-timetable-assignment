import { Schema, model } from 'mongoose';
import { ITimetable } from '../../interfaces/timeTable.interface';
import ClassRoom from './room.schema';
import Course from './course.schema';

const timeTableSchema = new Schema<ITimetable>({
  course: {
    type: Schema.Types.ObjectId,
    ref: Course,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: ClassRoom,
  },
  lecturer: {
    type: String,
    required: true,
  },
});

const TimeTable = model<ITimetable>('TimeTable', timeTableSchema);

export default TimeTable;
