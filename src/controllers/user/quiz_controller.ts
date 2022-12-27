
import { Request, Response } from "express"

export const getQuiz = async (req: Request, res: Response) => {
    try {
        res.json('Quiz response')
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}