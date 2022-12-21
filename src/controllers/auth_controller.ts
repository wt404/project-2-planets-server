
import { Request, Response } from "express"

export const register = async (req: Request, res: Response) => {
    try {
        res.json("Register")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        res.json("Login")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}

export const loginWithGoogle = async (req: Request, res: Response) => {
    try {
        res.json("Login with google")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}