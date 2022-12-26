
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import { OAuth2Client } from 'google-auth-library'
import UserModel from "../../../models/user_model"
const client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID)

export const loginWithGoogle = async (req: Request, res: Response) => {
    try {
        const { clientId, credential } = req.body

        const loginTicket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_OAUTH_CLIENT_ID
        })

        const payload = loginTicket.getPayload()

        if (payload == undefined) return res.status(400).json({ message: 'Invalid credentials' })

        let existingUser = await UserModel.findOne({ email: payload.email })

        if (!existingUser) {
            existingUser = await UserModel.create({
                firstName: payload.given_name,
                lastName: payload.family_name,
                email: payload.email,
                verified: true,
            })
        }
        
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