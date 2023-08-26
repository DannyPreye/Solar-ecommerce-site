import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/prisma/prisma.config";
import { generatePassword } from "@/utils/generate-password";
import { generateReferalCode } from "@/utils/generate-referral-code";
import { addReferal } from "@/utils/add-referal";
import SendEmail from "@/utils/send-mail";


export async function POST(req: Request)
{
    try {
        const json = await req.json();

        console.log(json);

        const { referalCode, email, password, fullName } = json;

        const checkUser = await prisma.user.findFirst({
            where: {
                email: email,
            }
        });

        // If user exists return... only users that have not registered before
        // is allowed to register
        if (checkUser) {
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    message: "User already exists"
                }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        const { hash, salt } = generatePassword(password);
        const newreferalCode = generateReferalCode();

        const newUser = await prisma.user.create({
            data: {
                email,
                fullName,
                hash,
                salt,
                referalCode: newreferalCode,

            },
        });

        // FIND THE REFERER AND UPDATE
        if (referalCode) {
            await addReferal(referalCode, newUser);
        }

        // CREATE A TOKEN FOR EMAIL VERIFICATION
        const createToken = crypto.randomBytes(16).toString("hex");
        const newToken = await prisma.$runCommandRaw({
            insert: "Token",
            documents: [
                {
                    userId: newUser.id,
                    token: createToken,
                    expireAfterSeconds: 86400,
                },
            ],
        });

        const verificationUrl = `${process.env.BASE_URL}/auth/verify-email?token=${newToken.token}`;
        const verificationMail = await SendEmail(
            newUser.email as string,
            verificationUrl as string,
            newToken.token as string,
            newUser.fullName as string,
            "Welcome to Digital Gadget",
            "Welcome to Digital Gadget",
            "Click here to verify email",
            `Thanks for signing up to AgroConnect.
            Please click the button below to verify your email address.`
        );

        return new NextResponse(JSON.stringify({
            success: true,
            message: "User has been created"
        }), {
            status: 201,
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
}
