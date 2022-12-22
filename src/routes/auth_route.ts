
import express from 'express'

import { register } from '../controllers/auth/register_controller'
import { login } from '../controllers/auth/login_controller'
import { loginWithGoogle } from '../controllers/auth/login_with_google_controller'
import { resetPassword } from '../controllers/auth/reset_password_controller'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', loginWithGoogle)
router.post('/reset-password', resetPassword)

export default router