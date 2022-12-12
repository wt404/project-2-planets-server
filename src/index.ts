
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import planetRoute from './routes/planet_route'

const app: Application = express()

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

/*
    Routes
*/
app.use('/planet', planetRoute)

app.listen((process.env.PORT || 5000), () => console.log(`Server running`))