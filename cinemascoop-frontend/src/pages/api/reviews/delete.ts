import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function deleteReview(req: NextApiRequest, res: NextApiResponse<any>): Promise<void> {
    try {
        const apiPort = 3001;

        const reviewId = req.body.reviewId;

        if (!reviewId) {
            res.status(400).json({ message: "Review ID is required." });
            return;
        }

        const response = await fetch(`http://localhost:${apiPort}/api/v1/reviews/${reviewId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${req.body.token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Failed to delete review, status: ${response.status}`)
        }

        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message })
    }
})
