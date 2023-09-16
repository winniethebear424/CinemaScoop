import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default withApiAuthRequired(async function getToken(req: NextApiRequest, res: NextApiResponse<any>): Promise<void> {
    try {
        const { accessToken } = await getAccessToken(req, res);

        if (accessToken) {
            res.status(200).json({ accessToken });
        }
        else
        {
            res.status(401).json({ message: 'Unauthorized' });
        }

    } catch (error: any) {
        res.status(error.status || 500).json({ error: error.message })
    }
})
