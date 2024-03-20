import { Schema, model } from 'mongoose';
import Resource from '../resource/resource.schema';
import { IRoom } from './room.interface';

const roomSchema = new Schema<IRoom>({
  roomId: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: Resource,
    },
  ],
});

const ClassRoom = model<IRoom>('ClassRoom', roomSchema);

export default ClassRoom;
