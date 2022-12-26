
import { Request, Response } from "express"

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        res.json('dashboard data')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}