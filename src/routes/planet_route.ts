
import express from 'express'
import { getPlanets } from '../controllers/planet_controller'

const router = express.Router()

router.get('/', getPlanets)

export default router