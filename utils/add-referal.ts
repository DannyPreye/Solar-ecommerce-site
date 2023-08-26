import { User } from "@prisma/client";
import prisma from "../prisma/prisma.config";


export async function addReferal(referalCode: string, userData: any)
{
    try {
        const referrer = await prisma.user.findUnique({
            where: { referalCode: referalCode }
        });

        if (referrer) {
            userData.referredBy = { connect: { id: referrer.id } };

            //  Update the refferrees field of the referring user
            await prisma.user.update({
                where: { id: referrer.id },
                data: {
                    referrees: {
                        connect: { id: userData.id }
                    },


                }
            });
        }
    } catch (error) {
        console.log("referal could not be linked");
    }
}
