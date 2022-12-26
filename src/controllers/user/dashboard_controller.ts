
import { Request, Response } from "express"

export const getDashboardStats = async (_req: Request, res: Response) => {
    try {
        res.json('dashboard data')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}