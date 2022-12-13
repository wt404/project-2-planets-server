
import express from 'express'
import { getPlanets, getPlanet } from '../controllers/planet_controller'

const router = express.Router()

router.get('/', getPlanets)
router.get('/:id', getPlanet)

export default router