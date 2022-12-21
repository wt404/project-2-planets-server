
import { Request, Response } from "express"

export const loginWithGoogle = async (req: Request, res: Response) => {
    try {
        res.json("Login with google")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}