
import { Request, Response } from "express"
import LeaderboardModel from "../../models/leaderboard_model"
import QuizModel from "../../models/quiz_model"
import UserModel from "../../models/user_model"

export const getQuiz = async (req: Request, res: Response) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        const leaderboard = await LeaderboardModel.findOne({ user_id: existingUser._id })

        /* Not started yet */
        if (!leaderboard) {
            return res.json({
                status: 'start'
            })
        }

        /* Already started but not finished */
        if (leaderboard.finishedAt == null) {
            const quizData = await QuizModel.findOne({ _id: leaderboard.questionId })
            if (!quizData) return res.status(400).json({ message: 'Question not found' })

            return res.json({
                status: 'answering',
                questionId: quizData._id,
                question: quizData.question,
                choices: quizData.choices,
                totalCompletedQuestion: leaderboard.completedQuestionList.length
            })
        }

        /* Done */
        res.json({
            status: 'done',
            score: leaderboard.score,
            startedAt: leaderboard.startedAt,
            finishedAt: leaderboard.finishedAt
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const startQuiz = async (req: Request, res: Response) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        let leaderboard = await LeaderboardModel.findOne({ user_id: existingUser._id })
        if (!leaderboard) {
            const randomQuestion = await QuizModel.aggregate([
                {
                    $sample: { size: 1 }
                }
            ])
            leaderboard = await LeaderboardModel.create({
                user_id: existingUser._id,
                questionId: randomQuestion[0]._id,
                startedAt: new Date()
            })
        }

        const quizData = await QuizModel.findOne({ _id: leaderboard.questionId })
        if (!quizData) return res.status(400).json({ message: 'Question not found' })

        res.json({
            status: 'answering',
            questionId: quizData._id,
            question: quizData.question,
            choices: quizData.choices,
            totalCompletedQuestion: leaderboard.completedQuestionList.length
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}