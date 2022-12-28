
import express from 'express'
import { getProfile } from '../../controllers/user/profile_controller'

const router = express.Router()

router.get('/', getProfile)

export default router