
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import Mailjet from "node-mailjet"
import UserModel from "../models/user_mode"
import VerificationModel from '../models/verification_model'
import { generateToken } from './verification_controller'

export const register = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body

        if (first_name == undefined || first_name == '') return res.status(400).json({
            message: 'Invalid first name',
            type: 'first_name'
        })

        if (last_name == undefined || last_name == '') return res.status(400).json({
            message: 'Invalid last name',
            type: 'last_name'
        })

        if (email == undefined || email == '') return res.status(400).json({
            message: 'Invalid email',
            type: 'email'
        })

        if (password == undefined || password == '') return res.status(400).json({
            message: 'Invalid password',
            type: 'password'
        })

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) return res.status(400).json({ message: 'Email not available' })
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await UserModel.create({
            firstName: first_name,
            lastName: last_name,
            email,
            password: hashedPassword
        })

        const verification = await VerificationModel.create({
            user_id: user._id,
            type: 'account',
            token: await generateToken(),
        })

        const link = `https://space-verse.vercel.app/verify/${user._id}/${verification.token}`

        const mailjet = Mailjet.apiConnect(
            process.env.MJ_APIKEY_PUBLIC!,
            process.env.MJ_APIKEY_PRIVATE!,
        )

        mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: "spaceversegroup2@gmail.com",
                        Name: "SpaceVerse"
                    },
                    To: [
                        {
                            Email: email,
                            Name: `${first_name} ${last_name}`
                        },
                    ],
                    Subject: "Verify your Account",
                    TextPart: `Hello ${first_name}, please verify your account by clicking this link: ${link}`,
                    HTMLPart: ""
                }
            ]
        })

        res.json('Successfully registered')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

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

export const loginWithGoogle = async (req: Request, res: Response) => {
    try {
        res.json("Login with google")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}