
import { Request, Response } from "express"
import NewsModel from "../models/news_model"

export const getNews = async (req: Request, res: Response) => {
    try {
        const news = await NewsModel.find().sort({ _id: 1, })
        res.json(news)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}
