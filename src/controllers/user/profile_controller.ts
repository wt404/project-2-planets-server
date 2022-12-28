
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

export const updateProfile = async (req: Request, res: Response) => {
    try {

        const { avatar, first_name, last_name } = req.body

        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        await UserModel.findByIdAndUpdate(existingUser._id, { avatar, firstName: first_name, lastName: last_name })

        res.json({ message: 'Profile updated.' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}