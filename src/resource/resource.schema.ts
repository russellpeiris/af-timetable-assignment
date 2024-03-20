import { Schema, model } from 'mongoose';
import { IResource } from './resource.interface';

const resourceSchema = new Schema<IResource>({
  rId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});

const Resource = model<IResource>('Resource', resourceSchema);

export default Resource;
