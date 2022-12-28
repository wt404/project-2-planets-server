
import { Request, Response } from "express"
import UserModel from "../../models/user_model"

export const getProfile = async (req: Request, res: Response) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })
        res.json({
            avatar: existingUser.avatar,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}