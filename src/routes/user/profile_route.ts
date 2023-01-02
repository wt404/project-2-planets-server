
import express from 'express'
import { getProfile, updateProfile } from '../../controllers/user/profile_controller'

const router = express.Router()

router.get('/', getProfile)
router.post('/', updateProfile)

export default router