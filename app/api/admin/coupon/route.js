import { inngest } from "@/inngest/client";
import prisma from "@/lib/prisma";
import authAdmin from "@/middlewares/authAdmin";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Add New Coupon
export async function POST(request) {
    try {
        const {userId} = getAuth(request);
        const isAdmin = await authAdmin(userId);

        if(!isAdmin){
            return NextResponse.json({message: "You are not authorized to perform this action."}, {status: 401})
        }
        const { coupon } = await request.json()
        coupon.code = coupon.code.toUpperCase()

        await prisma.coupon.create({
            data: coupon
        }).then(async (coupon) => {
            // Trigger Inngest event to delete coupon on expiry
            await inngest.send({
                name: 'app/coupon.expired',
                data: { code: coupon.code, expiresAt: coupon.expiresAt }
            })
        })

        return NextResponse.json({message: "Coupon created successfully."})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });                
    }
}

// Delete Coupon /api/coupon?id=couponId
export async function DELETE(request) {
    try {
        const {userId} = getAuth(request);
        const isAdmin = await authAdmin(userId);

        if(!isAdmin){
            return NextResponse.json({message: "You are not authorized to perform this action."}, {status: 401})
        }
        const { searchParams } = request.nextUrl
        const code = searchParams.get('code')
        
        await prisma.coupon.delete({
            where: { code }
        })

        return NextResponse.json({message: "Coupon deleted successfully."})

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });                        
    }
}


// Get All Coupons
export async function GET(request) {

    try {
        const {userId} = getAuth(request);
        const isAdmin = await authAdmin(userId);

        if(!isAdmin){
            return NextResponse.json({message: "You are not authorized to perform this action."}, {status: 401})
        }
        
        const coupons = await prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        })
        
        return NextResponse.json({ coupons })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });                                
    }
}