
import { Schema, model } from "mongoose"

interface PlanetImageInterface {
    description: string
    url: string
}

interface PlanetInterface {
    name: string
    description: string
    planetOrder: number
    mass: string
    volume: string
    color: string
    day: string
    tilt: string
    year: string
    images: PlanetImageInterface[]
}

const schema = new Schema<PlanetInterface>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    planetOrder: { type: Number, required: true },
    mass: { type: String, required: true },
    volume: { type: String, required: true },
    color: { type: String, required: true },
    day: { type: String, required: true },
    tilt: { type: String, required: true },
    year: { type: String, required: true },
    images: { type: [], required: true }
})

const PlanetModel = model<PlanetInterface>('Planet', schema)

export default PlanetModel