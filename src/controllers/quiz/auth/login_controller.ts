
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import UserModel from '../../../models/user_model'
import { validateEmail, validatePassword } from '../../../utils/validation_util'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        let validateResponse = validateEmail(email)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'email'
            })
        }

        validateResponse = validatePassword(password)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'password'
            })
        }

        const existingUser = await UserModel.findOne({ email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })
        if (!existingUser.password) return res.status(400).json({ message: 'Invalid credentials' })
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid credentials' })
        if (!existingUser.verified) return res.status(400).json({ message: 'Please verify your account first '})
        const token = jwt.sign(
            {
                avatar: existingUser.avatar,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}