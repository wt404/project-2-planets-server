
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import planetsJson from './json/planets.json'
import newsJson from './json/news.json'
import quizJson from './json/quiz.json'

import PlanetModel from './models/planet_model'
import NewsModel from './models/news_model'
import QuizModel from './models/quiz_model'

mongoose.set('strictQuery', true)

mongoose.connect(process.env.CONNECTION_URL!).then(async () => {
    
    console.log('Generating data')

    await PlanetModel.deleteMany()
    await PlanetModel.create(planetsJson)

    await NewsModel.deleteMany()
    await NewsModel.create(newsJson)

    await QuizModel.deleteMany()
    await QuizModel.create(quizJson)

    console.log('Done')

}).catch((error) => console.log(error.message))