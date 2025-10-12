import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

// Verify Coupon
export async function POST(request) {
    try {
        const { userId, has } = getAuth(request);
        const { code } = await request.json();

        // Here, you would typically update the user's cart in your database.
        const coupon = await prisma.coupon.findUnique({
            where: { code: code.toUpperCase(),
                expiresAt: {gt: new Date()}
             },
        });

        if(!coupon){
            return NextResponse.json({error: "Coupon Not Found"}, {status: 404})
        }

        if(coupon.forNewUser){
            const userOrders = await prisma.order.findMany({where: {userId}})
            if(userOrders.length > 0 ){
                return NextResponse.json({error: "Coupon Valid for new Users Only"}, {status: 400})
            }
        }

        if(coupon.forMember){
            const hasplusplane = has({plan: 'plus'})
            if(!hasplusplane){
                return NextResponse.json({error: "Coupon Valid for Members Only"}, {status: 400})
            }
        }

        return NextResponse.json({coupon});

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });        
    }
}