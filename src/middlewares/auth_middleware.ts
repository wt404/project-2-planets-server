
import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) return res.status(400).json({ message: 'Please login' })
        const token = authHeader.split(' ')[1]
        const jwtSecret = process.env.JWT_SECRET
        const decoded = jwt.verify(token, jwtSecret!)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' })
    }
}

export default auth