import bycrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import { IUser } from '../../interfaces'
import { hashPassword } from '../../utils/hash.util'
import { Roles } from '../enums/roles.enum'

const userSchema = new Schema<IUser>({
  nic: {
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
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: Roles.STUDENT,
    enum: Object.values(Roles),
  },
  name: {
    type: String,
    required: true,
  },
})

userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await hashPassword(user.password)
  }
  next()
})

userSchema.methods.comparePassword = async function (password: string) {
  return await bycrypt.compare(password, this.password)
}

const User = model<IUser>('User', userSchema)

export default User
