

import express from 'express'
import { getLeadeboards } from '../../controllers/quiz/leaderboard_controller'

const router = express.Router()

router.get('/', getLeadeboards)

export default router