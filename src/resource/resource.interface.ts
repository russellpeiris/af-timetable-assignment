import { Document } from 'mongoose';

export interface IResource extends Document {
  rId: string;
  name: string;
  isAvailable: boolean;
}
