
import { Schema, model, ObjectId } from "mongoose";

interface LeaderboardInterface {
    user_id: ObjectId
    score: number
    startedAt: Date
    finishedAt: Date
    questionId: ObjectId
    completedQuestionList: []
}

const schema = new Schema<LeaderboardInterface>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    startedAt: { type: Date, required: true },
    finishedAt: { type: Date, default: null },
    questionId: { type: Schema.Types.ObjectId, req: 'Question', default: null },
    completedQuestionList: { type: [], default: [] }
})

const LeaderboardModel = model<LeaderboardInterface>('Leaderboard', schema)

export default LeaderboardModel