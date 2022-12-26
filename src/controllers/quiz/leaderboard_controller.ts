
import { Request, Response } from "express"

export const getLeadeboards = async (req: Request, res: Response) => {
    try {
        
        res.json('Leaderboards')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}