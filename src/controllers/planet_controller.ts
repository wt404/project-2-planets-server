
import { Request, Response } from "express"
import PlanetModel from "../models/planet_model"

export const getPlanets = async (req: Request, res: Response) => {
    try {
        const planets = await PlanetModel.find()
        res.json(planets)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}