
import { Request, Response } from "express"

export const getProfile = async (req: Request, res: Response) => {
    try {
        res.json("Profile")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}