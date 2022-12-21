
import express from 'express'
import { verifyAccount } from '../controllers/verification_controller'

const router = express.Router()

router.get('/account/:id/:token', verifyAccount)

export default router