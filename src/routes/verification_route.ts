
import express from 'express'
import { verifyAccount } from '../controllers/verification_controller'

const router = express.Router()

router.post('/account', verifyAccount)

export default router