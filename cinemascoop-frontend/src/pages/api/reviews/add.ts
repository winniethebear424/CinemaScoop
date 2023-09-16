import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function addReview(req: NextApiRequest, res: NextApiResponse<any>): Promise<void> {
    try {
        const apiPort = 3001;
        const reviewData = req.body; 

        const response = await fetch(`http:localhost:${apiPort}/api/v1/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.body.token}`
            },
            body: JSON.stringify(reviewData)
        })

        if (!response.ok) {
            throw new Error(`Failed to add review, status: ${response.status}`)
        }

        const review = await response.json();
        res.status(201).json(review);
    } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message })
    }
})
