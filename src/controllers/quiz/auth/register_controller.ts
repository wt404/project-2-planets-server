
import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import Mailjet from "node-mailjet"
import UserModel from "../../../models/user_model"
import VerificationModel from '../../../models/verification_model'
import { validateEmail, validateFirstName, validateLastName, validatePassword } from '../../../utils/validation_util'
import { generateToken } from '../../verify/verification_controller'

export const register = async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, email, password } = req.body

        let validateResponse = validateFirstName(first_name)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'first_name'
            })
        }

        validateResponse = validateLastName(last_name)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'last_name'
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

        const link = `https://space-verse.vercel.app/verify?id=${user._id}&token=${verification.token}`

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

        res.json({ message: 'Successfully registered. Please check your mail to verify your account.' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}