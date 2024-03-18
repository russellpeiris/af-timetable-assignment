import { Document } from 'mongoose';
import { IResource } from './resource.interface';

export interface IRoom extends Document {
  roomId: string;
  capacity: number;
  resources: IResource[];
}
