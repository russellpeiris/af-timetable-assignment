import { Schema, model } from 'mongoose';
import { IFaculty } from '../user/users.interface';

const facultySchema = new Schema<IFaculty>({
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  fId: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Faculty = model<IFaculty>('Faculty', facultySchema);

export default Faculty;
