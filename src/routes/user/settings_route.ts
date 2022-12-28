
import express from 'express'
import { updatePassword } from '../../controllers/user/settings_controller'

const router = express.Router()

router.post('/', updatePassword)

export default router