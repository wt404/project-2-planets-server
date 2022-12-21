
import express from 'express'
import { sendFeedback } from '../controllers/feedback_controller'

const router = express.Router()

router.post('/', sendFeedback)

export default router