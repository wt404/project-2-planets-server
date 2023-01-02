
import { Request, Response } from "express"
import Mailjet from "node-mailjet"

export const sendFeedback = async (req: Request, res: Response) => {
    try {
        
        const { firstName, lastName, email, message } = req.body

        if (firstName == undefined || firstName == '') return res.status(400).json({
            message: 'Invalid first name',
            type: 'firstName'
        })

        if (lastName == undefined || lastName == '') return res.status(400).json({
            message: 'Invalid last name',
            type: 'lastName'
        })

        if (email == undefined || email == '') return res.status(400).json({
            message: 'Invalid email',
            type: 'email'
        })

        if (message == undefined || message == '') return res.status(400).json({
            message: 'Invalid message',
            type: 'message'
        })

        const mailjet = Mailjet.apiConnect(
            process.env.MJ_APIKEY_PUBLIC!,
            process.env.MJ_APIKEY_PRIVATE!,
        )

        mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: "spaceversegroup2@gmail.com",
                        Name: "SpaceVerse"
                    },
                    To: [
                        {
                            Email: "alandemol05@gmail.com",
                            Name: "Alan Demol"
                        },
                        {
                            Email: "kap.utolclothing@gmail.com",
                            Name: "Angela Morales"
                        },
                        {
                            Email: "jasonlerit077@gmail.com",
                            Name: "Jason Lerit"
                        },
                        {
                            Email: "cladojomar881@gmail.com",
                            Name: "Jomar Clado"
                        }
                    ],
                    Subject: "Feedback Received",
                    TextPart: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nMessage: ${message}`,
                    HTMLPart: ""
                }
            ]
        })

        res.json({ message: 'Feedback sent' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}