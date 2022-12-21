
import { Request, Response } from "express"

export const verifyAccount = async (req: Request, res: Response) => {
    try {
        
        res.json('Account verified')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}
