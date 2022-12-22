
import express from 'express'
import { verifyAccount, verifyPassword } from '../controllers/verification_controller'

const router = express.Router()

router.post('/account', verifyAccount)
router.post('/password', verifyPassword)

export default router