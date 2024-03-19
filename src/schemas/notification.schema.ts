import { Schema, model } from 'mongoose';
import { INotification } from '../../interfaces';

const notificationSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = model<INotification>('Notification', notificationSchema);

export default Notification;
