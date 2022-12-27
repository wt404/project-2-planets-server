
import express from 'express'
import { getQuiz } from '../../controllers/user/quiz_controller'

const router = express.Router()

router.get('/', getQuiz)

export default router