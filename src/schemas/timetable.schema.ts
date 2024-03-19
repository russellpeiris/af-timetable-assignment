import { Schema, model } from 'mongoose';
import { ITimetable } from '../../interfaces/timeTable.interface';
import TimeTableSession from './session.schema';

const timeTableSchema = new Schema<ITimetable>({
  courseCode: {
    type: String,
    required: true,
    unique: true,
  },
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: TimeTableSession,
    },
  ],
});

const TimeTable = model<ITimetable>('TimeTable', timeTableSchema);

export default TimeTable;
