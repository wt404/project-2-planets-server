
import express from 'express'
import { getQuiz, startQuiz } from '../../controllers/user/quiz_controller'

const router = express.Router()

router.get('/', getQuiz)
router.post('/', startQuiz)

export default router