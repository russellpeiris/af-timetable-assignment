import { Schema, model } from 'mongoose'
import { IAdmin } from '../../interfaces/users.interface'

const adminSchema = new Schema<IAdmin>({})

const Admin = model<IAdmin>('Admin', adminSchema)

export default Admin
