
import express from 'express'
import { verifyAccount } from '../controllers/verification_controller'

const router = express.Router()

router.get('/account', verifyAccount)

export default router