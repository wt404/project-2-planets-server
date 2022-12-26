
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

import authRoute from './routes/auth_route'
import verificationRoute from './routes/verification_route'

import leaderdboardRoute from './routes/quiz/leaderboard_route'

mongoose.set('strictQuery', true)

const app: Application = express()

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use(mongoSanitize())

/*
    Routes
*/
app.use('/planets', planetRoute)
app.use('/news', newsRoute)
app.use('/feedback', feedbackRoute)

app.use('/auth', authRoute)
app.use('/verify', verificationRoute)

app.use('/leaderboards', leaderdboardRoute)

mongoose.connect(process.env.CONNECTION_URL!)
    .then(() => app.listen((process.env.PORT || 5000), () => console.log(`Server running`)))
    .catch((error) => console.log(error.message))