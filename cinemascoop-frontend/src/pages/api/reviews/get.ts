import { NextApiRequest, NextApiResponse } from "next";

export default async function getReview(req: NextApiRequest, res: NextApiResponse<any>): Promise<void> {
    try {
        const apiPort = 3001;
        const {movieId} = req.query;
        const response = await fetch(`http:localhost:${apiPort}/api/v1/reviews?movieId=${encodeURIComponent(movieId as string)}`)

        if (!response.ok) {
            throw new Error(`Failed to get review, status: ${response.status}`)
        }

        const review = await response.json();
        res.status(200).json(review);
    } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message })
    }
}
