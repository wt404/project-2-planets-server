
import { Request, Response } from "express"
import LeaderboardModel from "../../models/leaderboard_model"
import UserModel from "../../models/user_model"

export const getLeadeboards = async (_req: Request, res: Response) => {
    try {
        
        const result = await LeaderboardModel.aggregate([
            // Filter by finishedAt (not null)
            {
                $match: {
                    finishedAt: {
                        $ne: null
                    }
                }
            },
            // Sort by scores & finishedAt
            {
                $sort: {
                    score: -1, // descending
                    finishedAt: 1 // ascending
                }
            },
            // Limit by 10
            {
                $limit: 10
            }
        ])

        for (const data of result) {
            const existingUser = await UserModel.findOne({ _id: data.user_id })
            data['full_name'] = existingUser ? `${existingUser.firstName} ${existingUser.lastName}` : 'Not found'

            delete data.user_id
            delete data.question_id
            delete data.completed_question_list
        }

        res.json(result)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}