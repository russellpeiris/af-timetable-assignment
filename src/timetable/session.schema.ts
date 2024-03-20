import { Schema, model } from 'mongoose';
import ClassRoom from '../classroom/room.schema';
import { ITimetableSession } from './timeTable.interface';

const timeTableSessionSchema = new Schema<ITimetableSession>({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
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
    // required: true,
  },
  lecturer: {
    type: String,
    required: true,
  },
});

const TimeTableSession = model<ITimetableSession>(
  'TimeTableSession',
  timeTableSessionSchema,
);

export default TimeTableSession;
