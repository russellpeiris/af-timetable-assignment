import { Schema, model } from 'mongoose';
import { IRoom } from '../../interfaces/room.interface';
import Resource from './resource.schema';

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
