
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import UserModel from '../../models/user_model'

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (email == undefined || email == '') return res.status(400).json({
            message: 'Invalid email',
            type: 'email'
        })

        if (password == undefined || password == '') return res.status(400).json({
            message: 'Invalid password',
            type: 'password'
        })

        const existingUser = await UserModel.findOne({ email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordMatch) return res.status(400).json({ message: 'Invalid credentials' })
        if (!existingUser.verified) return res.status(400).json({ message: 'Please verify your account first '})
        const token = jwt.sign(
            {
                first_name: existingUser.firstName,
                last_name: existingUser.lastName,
                email: existingUser.email,
            },
            process.env.JTW_SECRET!,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        )
        res.json({ token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}