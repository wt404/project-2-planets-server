
import express from 'express'

import { register } from '../controllers/auth/register_controller'
import { login } from '../controllers/auth/login_controller'
import { loginWithGoogle } from '../controllers/auth/login_with_google_controller'
import { forgotPassword } from '../controllers/auth/forgot_password_controller'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', loginWithGoogle)
router.post('/forgot-password', forgotPassword)

export default router