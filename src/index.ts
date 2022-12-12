
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import planetRoute from './routes/planet_route'

mongoose.set('strictQuery', true)

const app: Application = express()

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

/*
    Routes
*/
app.use('/planet', planetRoute)

mongoose.connect(process.env.CONNECTION_URL!)
    .then(() => app.listen((process.env.PORT || 5000), () => console.log(`Server running`)))
    .catch((error) => console.log(error.message))