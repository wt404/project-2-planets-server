
import { Schema, model } from "mongoose"

interface NewsInterface {
    title: string
    body: string
    date: string
    image: string
    url: string
}

const schema = new Schema<NewsInterface>({
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
})

const NewsModel = model<NewsInterface>('News', schema)

export default NewsModel