

import express from 'express'
import { getNews } from '../controllers/news_controller'

const router = express.Router()

router.get('/', getNews)

export default router