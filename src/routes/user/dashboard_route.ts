
import express from 'express'
import { getDashboardStats } from '../../controllers/user/dashboard_controller'

const router = express.Router()

router.get('/', getDashboardStats)

export default router