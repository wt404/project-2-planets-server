
import express from 'express'
import { getQuiz, startQuiz, submitAnswer } from '../../controllers/user/quiz_controller'

const router = express.Router()

router.get('/', getQuiz)
router.post('/', startQuiz)
router.post('/submit', submitAnswer)

export default router