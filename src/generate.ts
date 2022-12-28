
import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import planetsJson from './json/planets.json'
import newsJson from './json/news.json'

import PlanetModel from './models/planet_model'
import NewsModel from './models/news_model'

mongoose.set('strictQuery', true)

mongoose.connect(process.env.CONNECTION_URL!).then(async () => {
    
    console.log('Generating data')

    await PlanetModel.deleteMany()
    await PlanetModel.create(planetsJson)

    await NewsModel.deleteMany()
    await NewsModel.create(newsJson)

    console.log('Done')

}).catch((error) => console.log(error.message))