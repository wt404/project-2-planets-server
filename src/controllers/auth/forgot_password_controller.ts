
import { Request, Response } from "express"
import Mailjet from "node-mailjet"
import UserModel from "../../models/user_model"
import VerificationModel from "../../models/verification_model"
import { validateEmail } from "../../utils/validation_util"
import { generateToken } from "../verification_controller"

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body

        let validateResponse = validateEmail(email)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'email'
            })
        }

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
                            Name: "SpaceVerse"
                        },
                        To: [
                            {
                                Email: email,
                                Name: `${existingUser.firstName} ${existingUser.lastName}`
                            },
                        ],
                        Subject: "Reset Password",
                        TextPart: `Hello ${existingUser.firstName}, if you requested to change your password please click the link: ${link}`,
                        HTMLPart: ""
                    }
                ]
            })
        }

        res.json({ message: 'Check your email for a link to reset your password.' })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}