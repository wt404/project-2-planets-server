
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { Request, Response } from "express"
import UserModel from "../models/user_model"
import VerificationModel from "../models/verification_model"

export const verifyAccount = async (req: Request, res: Response) => {
    try {
        const { id, token } = req.body    

        if (id == undefined || id == '') return res.status(400).json({
            message: 'Invalid id',
            type: 'id'
        })

        if (token == undefined || token == '') return res.status(400).json({
            message: 'Invalid token',
            type: 'token'
        })

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

        const existingUser = await UserModel.findOne({ _id: id })

        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        if (existingUser.verified) return res.status(400).json({ message: 'Account already verified' })

        const existingVerification = await VerificationModel.findOne({ user_id: existingUser._id })

        if (!existingVerification) return res.status(400).json({ message: 'Verification not found' })

        if (token != existingVerification.token) return res.status(400).json({ message: 'Verification token not matched' })

        await UserModel.findByIdAndUpdate(id, { verified: true })

        res.json('Account verified')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const verifyPassword = async (req: Request, res: Response) => {
    try {
        const { id, token, password } = req.body

        if (id == undefined || id == '') return res.status(400).json({
            message: 'Invalid id',
            type: 'id'
        })

        if (token == undefined || token == '') return res.status(400).json({
            message: 'Invalid token',
            type: 'token'
        })

        if (password == undefined || password == '') return res.status(400).json({
            message: 'Invalid password',
            type: 'password'
        })

        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })

        const existingUser = await UserModel.findOne({ _id: id })

        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        const existingVerification = await VerificationModel.findOne({ user_id: existingUser._id })

        if (!existingVerification) return res.status(400).json({ message: 'Verification not found' })

        if (token != existingVerification.token) return res.status(400).json({ message: 'Verification token not matched' })

        const hashedPassword = await bcrypt.hash(password, 12)

        await UserModel.findByIdAndUpdate(id, { password: hashedPassword })

        res.json({ message: 'Password has been updated' })
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const generateToken = async () => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    while (true) {
        let newToken = ""
        const length = 30
        for ( let i = 0; i < length; i++ ) {
            newToken += characters.charAt(Math.floor(Math.random() * length));
        }
        const existingVerification = await VerificationModel.findOne({ token: newToken })
        if (!existingVerification) return newToken
    }
}