import NextAuth from "next-auth";

declare module "next-auth" {
    interface User
    {
        name: string;
        role: string;
        emailVerified: boolean;
        referalCode: string;
        email: string;
        id: string;
    }

    interface Session
    {
        user: {
            name: string;
            role: string;
            emailVerified: boolean;
            referalCode: string;
            email: string;
            id: string;

        };
    }
}
