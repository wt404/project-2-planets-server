
import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import UserModel from "../../models/user_model"
import { validatePassword } from "../../utils/validation_util"

export const updatePassword = async (req: Request, res: Response) => {
    try {

        const { old_password, new_password } = req.body

        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        let validateResponse = validatePassword(old_password)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'password'
            })
        }

        validateResponse = validatePassword(new_password)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'password'
            })
        }

        if (existingUser.password) {
            const isPasswordMatch = await bcrypt.compare(old_password, existingUser.password)
            if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid old password' })
        }

        const hashedPassword = await bcrypt.hash(new_password, 12)

        await UserModel.findByIdAndUpdate(existingUser._id, { password: hashedPassword })

        res.json({ message: 'Password updated.' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}