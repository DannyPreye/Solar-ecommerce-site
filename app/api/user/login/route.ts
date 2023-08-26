import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma.config";
import { validatePassword } from "@/utils/generate-password";

export async function POST(req: Request)
{
    console.log("e reach me ");
    try {

        const json = await req.json();
        const { email, password } = json;

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            return new NextResponse(JSON.stringify({
                success: false,
                message: "User is not registered"
            }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }
        const hash = user.hash;
        const salt = user.salt;
        if (!validatePassword(password, hash, salt)) {
            return new NextResponse(JSON.stringify({
                success: false,
                message: "Password or email is not correct"
            }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }


        return new NextResponse(JSON.stringify({
            success: true,
            data: {
                email: user.email,
                emailVerified: user.emailVerified,
                fullName: user.fullName,
                image: user.image,
                phone: user.phone,
                referralCode: user.referalCode,
                role: user.role,
                id: user.id
            }
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        });



    } catch (error) {

        console.log(error);

        return new NextResponse(JSON.stringify({
            success: false,
            message: "Server Error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });

    }
    finally {
        prisma.$disconnect();
    }
}
