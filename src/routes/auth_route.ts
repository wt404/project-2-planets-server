

import express from 'express'
import { register, login, loginWithGoogle } from '../controllers/auth_controller'
import { forgotPassword } from '../controllers/auth/forgot_password_controller'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', loginWithGoogle)
router.post('/forgot-password', forgotPassword)

export default router