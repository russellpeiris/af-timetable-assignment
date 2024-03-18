import { Document } from 'mongoose';

export interface INotification extends Document {
  message: string;
  recipient: string;
  createdAt: Date;
  updatedAt: Date;
}
