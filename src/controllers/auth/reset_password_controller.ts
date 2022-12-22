
import { Request, Response } from "express"
import Mailjet from "node-mailjet"
import UserModel from "../../models/user_model"
import VerificationModel from "../../models/verification_model"
import { generateToken } from "../verification_controller"

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body

        if (email == undefined || email == '') return res.status(400).json({
            message: 'Invalid email',
            type: 'email'
        })

        const existingUser = await UserModel.findOne({ email })
        
        if (existingUser) {
            const verification = await VerificationModel.create({
                user_id: existingUser._id,
                type: 'password',
                token: await generateToken(),
            })

            const link = `https://space-verse.vercel.app/quiz/reset-password?id=${existingUser._id}&token=${verification.token}`

            const mailjet = Mailjet.apiConnect(
                process.env.MJ_APIKEY_PUBLIC!,
                process.env.MJ_APIKEY_PRIVATE!,
            )

            mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: "spaceversegroup2@gmail.com",
                            Name: "SpaceVerse Reset Password"
                        },
                        To: [
                            {
                                Email: email,
                                Name: `${existingUser.firstName} ${existingUser.lastName}`
                            },
                        ],
                        Subject: "Verify your Account",
                        TextPart: `Hello ${existingUser.firstName}, if you requested to change your password please click the link: ${link}`,
                        HTMLPart: ""
                    }
                ]
            })
        }

        res.json('Check your email for a link to reset your password.')

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}