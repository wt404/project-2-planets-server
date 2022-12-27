
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import mongoSanitize from 'express-mongo-sanitize'

import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import planetRoute from './routes/planet_route'
import newsRoute from './routes/news_route'
import feedbackRoute from './routes/feedback_route'

import verificationRoute from './routes/verify/verification_route'

import authRoute from './routes/quiz/auth_route'
import leaderdboardRoute from './routes/quiz/leaderboard_route'

import authMiddleware from './middlewares/auth_middleware'
import dashboardRoute from './routes/user/dashboard_route'

mongoose.set('strictQuery', true)

/*
    User for auth_middleware
*/
declare global {
    namespace Express {
        interface Request {
            user: any
        }
    }
}

const app: Application = express()

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use(mongoSanitize())

/*
    Routes
*/

/* Main */
app.use('/planets', planetRoute)
app.use('/news', newsRoute)
app.use('/feedback', feedbackRoute)

/* Verify */
app.use('/verify', verificationRoute)

/* Quiz */
app.use('/quiz/auth', authRoute)
app.use('/quiz/leaderboards', leaderdboardRoute)

/* User with middleware */
app.use('/user/dashboard', authMiddleware, dashboardRoute)

mongoose.connect(process.env.CONNECTION_URL!)
    .then(() => app.listen((process.env.PORT || 5000), () => console.log(`Server running`)))
    .catch((error) => console.log(error.message))