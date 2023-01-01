
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { Request, Response } from "express"
import { validateId, validatePassword, validateToken } from '../../../utils/validation_util'
import UserModel from '../../../models/user_model'
import VerificationModel from '../../../models/verification_model'

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { id, token, password } = req.body

        let validateResponse = validateId(id)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'id'
            })
        }

        validateResponse = validateToken(token)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'token'
            })
        }

        validateResponse = validatePassword(password)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'password'
            })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

        const existingUser = await UserModel.findOne({ _id: id })

        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        const existingVerification = await VerificationModel.findOne({ user_id: existingUser._id, type: 'password', token })

        if (!existingVerification) return res.status(400).json({ message: 'Verification not found' })

        const hashedPassword = await bcrypt.hash(password, 12)

        await VerificationModel.findByIdAndDelete(existingVerification._id)

        await UserModel.findByIdAndUpdate(id, { password: hashedPassword })

        res.json({ message: 'Password has been updated' })
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}