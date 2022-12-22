
import { Schema, model } from "mongoose"

interface UserInterface {
    firstName: string
    lastName: string
    email: string
    password: string
    verified: boolean
    createdAt: Date
}

const schema = new Schema<UserInterface>({
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, required: true },
    password: { type: String },
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
})

const UserModel = model<UserInterface>('User', schema)

export default UserModel