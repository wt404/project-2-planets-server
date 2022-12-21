
import { Schema, model } from "mongoose"

interface UserInterface {
    firstName: string
    lastName: string
    email: string
    password: string
    createdAt: Date
}

const schema = new Schema<UserInterface>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
})

const UserModel = model<UserInterface>('User', schema)

export default UserModel