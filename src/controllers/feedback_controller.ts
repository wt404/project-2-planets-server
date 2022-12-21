
import { Request, Response } from "express"
import Mailjet from "node-mailjet"

export const sendFeedback = async (req: Request, res: Response) => {
    try {
        
        const body = req.body

        if (body.first_name == undefined || body.first_name == '') return res.status(400).json({
            message: 'Invalid first name',
            type: 'first_name'
        })

        if (body.last_name == undefined || body.last_name == '') return res.status(400).json({
            message: 'Invalid last name',
            type: 'last_name'
        })

        if (body.email == undefined || body.email == '') return res.status(400).json({
            message: 'Invalid email',
            type: 'email'
        })

        if (body.message == undefined || body.message == '') return res.status(400).json({
            message: 'Invalid message',
            type: 'message'
        })

        const mailjet = Mailjet.apiConnect(
            process.env.MJ_APIKEY_PUBLIC!,
            process.env.MJ_APIKEY_PRIVATE!,
        )

        const request = mailjet
            .post('send', { version: 'v3.1' })
            .request({
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
                        TextPart: `First Name: ${body.first_name}\nLast Name: ${body.last_name}\nEmail: ${body.email}\nMessage: ${body.message}`,
                        HTMLPart: ""
                    }
                ]
            })

        request
            .then((result) => {
                console.log(result.body)
            })
            .catch((err) => {
                console.log(err.statusCode)
            })

        res.json("Feedback sent")
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
}