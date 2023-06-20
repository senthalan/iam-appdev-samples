import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const tokenObj: any = await getToken({ req, secret });
    console.log("tokenObj: " + JSON.stringify(tokenObj));

    const idToken = tokenObj?.idToken;
    console.log("idToken: " + idToken);

    const redirectionUrl = ("https://api.asgardeo.io/t/" + process.env.NEXT_PUBLIC_ASGARDEO_ORGANIZATION_NAME +
                                "/oidc/logout?id_token_hint=" + idToken + "&post_logout_redirect_uri=" +
                                process.env.NEXT_PUBLIC_ASGARDEO_POST_LOGOUT_REDIRECT_URI + "&state=sign_out_success"
                            );
    // res.status(302).setHeader('Location', redirectionUrl)
    res.status(200).json({"location" : redirectionUrl});
}
