
import { Request, Response } from "express"
import UserModel from "../../models/user_model"
import { validateFirstName, validateLastName } from "../../utils/validation_util"

export const getProfile = async (req: Request, res: Response) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })
        res.json({
            avatar: existingUser.avatar,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            email: existingUser.email
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const updateProfile = async (req: Request, res: Response) => {
    try {

        const { avatar, firstName, lastName } = req.body

        let validateResponse = validateFirstName(firstName)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'first_name'
            })
        }

        validateResponse = validateLastName(lastName)
        if (validateResponse !== null) {
            return res.status(400).json({
                message: validateResponse,
                type: 'last_name'
            })
        }

        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        await UserModel.findByIdAndUpdate(existingUser._id, { avatar, firstName, lastName })

        res.json({ message: 'Profile updated.' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}