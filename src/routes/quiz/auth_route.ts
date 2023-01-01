
import express from 'express'

import { register } from '../../controllers/quiz/auth/register_controller'
import { login } from '../../controllers/quiz/auth/login_controller'
import { loginWithGoogle } from '../../controllers/quiz/auth/login_with_google_controller'
import { forgotPassword } from '../../controllers/quiz/auth/forgot_password_controller'
import { resetPassword } from '../../controllers/quiz/auth/reset_password_controller'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/google', loginWithGoogle)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

export default router