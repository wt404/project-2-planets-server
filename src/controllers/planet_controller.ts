
import { Request, Response } from "express"

export const getPlanets = async (req: Request, res: Response) => {
    res.json("Planets")
}