import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import Review from "@/models/review";

export default withApiAuthRequired(async function updateReview(req: NextApiRequest, res: NextApiResponse<any>): Promise<void> {
    try {
        const apiPort = 3001;
        const reviewData: Review = {
            reviewContent:req.body.reviewContent,
            ratting:req.body.reatting,
            movieId:req.body.movie,
            user:"",
        };
        const reviewId = req.body.reviewId;

        const response = await fetch(`http:localhost:${apiPort}/api/v1/reviews/${reviewId}`, {
            method: 'PATCH',
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
        res.status(200).json(review);
    } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message })
    }
})
