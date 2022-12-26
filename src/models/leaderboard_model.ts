
import { Schema, model, ObjectId } from "mongoose";

interface LeaderboardInterface {
    user_id: ObjectId
    score: number
    startedAt: Date
    finishedAt: Date
    question_id: ObjectId
    completed_question_list: []
}

const schema = new Schema<LeaderboardInterface>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, default: 0 },
    startedAt: { type: Date, default: new Date() },
    finishedAt: { type: Date, default: null },
    question_id: { type: Schema.Types.ObjectId, req: 'Question', default: null },
    completed_question_list: { type: [], default: [] }
})

const LeaderboardModel = model<LeaderboardInterface>('Leaderboard', schema)

export default LeaderboardModel