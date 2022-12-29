
import { Schema, model, ObjectId } from "mongoose";

interface LeaderboardInterface {
    user_id: ObjectId
    score: number
    startedAt: Date
    finishedAt: Date
    questionId: ObjectId
    completedQuestionList: any[]
    timeSpent: number
}

const schema = new Schema<LeaderboardInterface>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    startedAt: { type: Date, required: true },
    finishedAt: { type: Date, default: null },
    questionId: { type: Schema.Types.ObjectId, req: 'Question', default: null },
    completedQuestionList: { type: [], default: [] },
    timeSpent: { type: Number, default: null }
})

const LeaderboardModel = model<LeaderboardInterface>('Leaderboard', schema)

export default LeaderboardModel