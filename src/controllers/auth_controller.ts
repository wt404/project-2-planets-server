
import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import UserModel from "../models/user_mode"

export const register = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email not available' })
        const hashedPassword = await bcrypt.hash(password, 12)
        UserModel.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword
        })
        res.json('Successfully registered')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        res.json("Login")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const loginWithGoogle = async (req: Request, res: Response) => {
    try {
        res.json("Login with google")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}