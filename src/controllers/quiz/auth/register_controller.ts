
import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import Mailjet from "node-mailjet"
import UserModel from "../../../models/user_model"
import VerificationModel from '../../../models/verification_model'
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../../../utils/validation_util'
import { generateToken } from '../../verify/verification_controller'

export const register = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body

        let validateResponse = validateFirstName(firstName)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'firstName'
            })
        }

        validateResponse = validateLastName(lastName)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'lastName'
            })
        }

        validateResponse = validateEmail(email)
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
        if (existingUser) return res.status(400).json({
            message: 'Email not available',
            type: 'email'
        })
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            email,
            password: hashedPassword,
            createdAt: new Date()
        })

        const verification = await VerificationModel.create({
            user_id: user._id,
            type: 'account',
            token: await generateToken(),
        })

        const link = `https://space-verse.vercel.app/verify?id=${user._id}&token=${verification.token}`

        const mailjet = Mailjet.apiConnect(
            process.env.MJ_APIKEY_PUBLIC!,
            process.env.MJ_APIKEY_PRIVATE!,
        )

        mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: "spaceverseofficial2023@gmail.com",
                        Name: "SpaceVerse"
                    },
                    To: [
                        {
                            Email: email,
                            Name: `${firstName} ${lastName}`
                        },
                    ],
                    Subject: "Verify your Account",
                    TextPart: `Hello ${firstName}, please verify your account by clicking this link: ${link}`,
                    HTMLPart: ""
                }
            ]
        })

        res.json({ message: 'Successfully registered. Please check your mail to verify your account.' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}