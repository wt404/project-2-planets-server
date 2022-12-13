
import mongoose from 'mongoose'
import { Request, Response } from "express"
import PlanetModel from "../models/planet_model"

export const getPlanets = async (req: Request, res: Response) => {
    try {
        const planets = await PlanetModel.find().sort({ _id: 1, })
        res.json(planets)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const getPlanet = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' })
        const planet = await PlanetModel.find({ _id: id })
        res.json(planet)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }
}