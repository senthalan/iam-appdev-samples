
import NextAuth, { NextAuthOptions } from "next-auth"
import jwtDecode from "jwt-decode";
import { randomBytes, randomUUID } from "crypto";
import { Sequelize } from "sequelize";
import SequelizeAdapter from "@next-auth/sequelize-adapter";

// const sequelize = new Sequelize("sqlite::memory:")
// const adapter = SequelizeAdapter(sequelize)

// // Calling sync() is not recommended in production
// sequelize.sync()

export const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "asgardeo",
            name: "Asgardeo",
            clientId: process.env.NEXT_PUBLIC_ASGARDEO_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_ASGARDEO_CLIENT_SECRET,
            issuer: "https://api.asgardeo.io/t/" + process.env.NEXT_PUBLIC_ASGARDEO_ORGANIZATION_NAME + "/oauth2/token",
            userinfo: "https://api.asgardeo.io/t/" + process.env.NEXT_PUBLIC_ASGARDEO_ORGANIZATION_NAME + "/oauth2/userinfo",
            type: "oauth",
            wellKnown: "https://api.asgardeo.io/t/" + process.env.NEXT_PUBLIC_ASGARDEO_ORGANIZATION_NAME + "/oauth2/token/.well-known/openid-configuration",
            authorization: {
                params:
                    { 
                        scope: "openid profile groups urn:senthalan:backendservicepythonitems:add_item"
                    }
            },
            idToken: true,
            checks: ["pkce", "state"],
            profile(profile) {
                console.log("profile: " + JSON.stringify(profile));

                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    groups: profile.groups,
                }
            },
        },
    ],
    // adapter: SequelizeAdapter(sequelize),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
        
        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }: any) {
            console.log("signed In : " + JSON.stringify(user));
            return true
        },
        async session({ session, token, user }: any) {
            if (token) {
                const decodedAccessToken: any = jwtDecode(token.accessToken);
                session.user.scope =  decodedAccessToken.scope;
            }

            return session;
        },
        async jwt({ token, user, account, profile, isNewUser, session }) {
            if (account) {
                token.accessToken = account.access_token!
            }            

            return token;
        }
    },
    theme: {
        colorScheme: "light",
    },
    debug: true,
}

export default NextAuth(authOptions);