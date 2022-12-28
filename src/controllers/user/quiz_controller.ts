
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
                question: quizData.question,
                choices: quizData.choices,
                totalCompletedQuestion: leaderboard.completedQuestionList.length,
                startedAt: leaderboard.startedAt
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
            if (randomQuestion.length == 0) return res.status(400).json({ message: 'No more questions' })
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
            question: quizData.question,
            choices: quizData.choices,
            totalCompletedQuestion: leaderboard.completedQuestionList.length
        })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const submitAnswer = async (req: Request, res: Response) => {
    try {
        const { answer } = req.body

        const existingUser = await UserModel.findOne({ email: req.user.email })
        if (!existingUser) return res.status(400).json({ message: 'Invalid credentials' })

        const leaderboard = await LeaderboardModel.findOne({ user_id: existingUser._id })

        /* Not started yet */
        if (!leaderboard) return res.status(400).json({ message: 'Start quiz' })

        /* Already done */
        if (leaderboard.finishedAt !== null) return res.status(400).json({ message: 'Already finished' })

        /* Check if does not have enough time */
        const startedAt = new Date(leaderboard.startedAt).getTime()
        const currentTime = new Date().getTime()
        const totalSeconds = (currentTime - startedAt) / 1000
        if (totalSeconds >= 600) {
            const finishedAt = new Date()
            await LeaderboardModel.findByIdAndUpdate(leaderboard._id, { finishedAt })
            return res.json({
                status: 'done',
                score: leaderboard.score,
                startedAt: leaderboard.startedAt,
                finishedAt: finishedAt
            })
        }

        /* Check answer if correct */
        const quizData = await QuizModel.findOne({ _id: leaderboard.questionId })
        if (!quizData) return res.status(400).json({ message: 'Question not found' })
        if (answer == quizData.answer) {
            await LeaderboardModel.findByIdAndUpdate(leaderboard._id, { score: leaderboard.score + 1 })
        }

        /* Add current questionId to completedQuestionList */
        let completedQuestionList = leaderboard.completedQuestionList
        completedQuestionList.push(quizData._id)
        await LeaderboardModel.findByIdAndUpdate(leaderboard._id, { completedQuestionList })

        /* Check if completed */
        if (completedQuestionList.length >= 5) {
            const finishedAt = new Date()
            await LeaderboardModel.findByIdAndUpdate(leaderboard._id, { finishedAt })

            const finalLeaderboard = await LeaderboardModel.findOne({ user_id: existingUser._id })
            /* Not started yet */
            if (!finalLeaderboard) return res.status(400).json({ message: 'Start quiz' })

            return res.json({
                status: 'done',
                score: finalLeaderboard.score,
                startedAt: finalLeaderboard.startedAt,
                finishedAt: finalLeaderboard.finishedAt
            })
        }

        /* Get random question */
        const randomQuestion = await QuizModel.aggregate([
            {
                $match: { _id: { $nin: completedQuestionList }}
            },
            {
                $sample: { size: 1 }
            }
        ])

        if (randomQuestion.length == 0) return res.status(400).json({ message: 'No more questions' })

        /* Update questionId */
        await LeaderboardModel.findByIdAndUpdate(leaderboard._id, { questionId: randomQuestion[0]._id })
        
        res.json({
            status: 'answering',
            question: randomQuestion[0].question,
            choices: randomQuestion[0].choices,
            totalCompletedQuestion: completedQuestionList.length
        })

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}