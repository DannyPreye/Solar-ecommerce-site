import axios from "axios";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Awaitable } from "next-auth";
import prisma from "@/prisma/prisma.config";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        Credentials({
            name: "Credentials",
            id: "credentials",
            credentials: {},
            authorize: async (credentials, req) =>
            {
                const { email, password } = credentials as {
                    email: string,
                    password: string,

                };

                const { data: res } = await axios.post(`${process.env.BASE_URL}/api/user/login`, {
                    email, password

                });




                if (res.success) {
                    console.log("hello friend");
                    return {
                        id: res.data.id,
                        name: res.data.fullName,
                        role: res.data.role,
                        email: res.data.email,
                        emailVerified: res.data.emailVerified,
                        referalCode: res.data.referralCode
                    };

                } else {

                    return null;
                }

            }

        })

    ],
    adapter: PrismaAdapter(prisma) as Awaitable<any>,
    pages: {
        signIn: "/auth/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60

    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 1 * 24 * 60 * 60,
        // encryption: true,
    },
    callbacks: {
        jwt: async ({ token, user }) =>
        {

            if (user) {
                token = {
                    // ...token,
                    ...user,
                    iat: Math.floor(Date.now() / 1000), // Add issued at time
                    exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
                };
            }
            return token;
        },
        session: async ({ session, token, user }) =>
        {


            // session?.user = token?.user;
            console.log("Token", user);
            session.user = {
                name: token.name as string,
                role: token.role as string,
                emailVerified: token.emailVerified as boolean,
                referalCode: token.referalCode as string,
                email: token.email as string,
                id: token.id as string
            };



            return session;
        },
        // redirect: async ({ url, baseUrl }) => { }


    },
    secret: process.env.NEXTAUTH_SECRET

});

export { handler as GET, handler as POST };
