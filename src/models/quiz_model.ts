
import { Schema, model } from "mongoose";

interface QuizInterface {
    question: string
    answer: string
    choices: Object
}

const schema = new Schema<QuizInterface>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
    choices: { type: {}, default: {} }
})

const QuizModel = model<QuizInterface>('Quiz', schema)

export default QuizModel