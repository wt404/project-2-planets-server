
import { Request, Response } from "express"
import Mailjet from "node-mailjet"

export const sendFeedback = async (req: Request, res: Response) => {
    try {
        
        const { first_name, last_name, email, message } = req.body

        if (first_name == undefined || first_name == '') return res.status(400).json({
            message: 'Invalid first name',
            type: 'first_name'
        })

        if (last_name == undefined || last_name == '') return res.status(400).json({
            message: 'Invalid last name',
            type: 'last_name'
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
                        Name: "SpaceVerse Feedback"
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
                    TextPart: `First Name: ${first_name}\nLast Name: ${last_name}\nEmail: ${email}\nMessage: ${message}`,
                    HTMLPart: ""
                }
            ]
        })

        res.json({ message: 'Feedback sent' })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}