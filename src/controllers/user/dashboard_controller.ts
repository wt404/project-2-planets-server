
import { Request, Response } from "express"
import LeaderboardModel from "../../models/leaderboard_model"
import UserModel from "../../models/user_model"

export const getDashboardStats = async (req: Request, res: Response) => {
    try {

        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

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
            // Group
            {
                $group: {
                    _id: null,
                    players: {
                        $push: {
                            _id: "$_id",
                            user_id: "$user_id",
                            score: "$score",
                            startedAt: "$startedAt",
                            finishedAt: "$finishedAt"
                        }
                    }
                }
            },
            // Unwind
            {
                $unwind: {
                    path: "$players",
                    includeArrayIndex: "rank"
                }
            },
            // Get user
            {
                $match: {
                    "players.user_id": existingUser._id
                }
            }
        ])

        const stats = {
            rank: null,
            correct_answer: null,
            started_at: null,
            finished_at: null
        }

        if (result.length != 0) {
            stats.rank = result[0]["rank"]
            stats.correct_answer = result[0].players["score"]
            stats.started_at = result[0].players["startedAt"]
            stats.finished_at = result[0].players["finishedAt"]
        }

        res.json(stats)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}