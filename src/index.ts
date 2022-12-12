
import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Application = express()

app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    res.json('Test')
})

app.listen((process.env.PORT || 5000), () => console.log(`Server running`))