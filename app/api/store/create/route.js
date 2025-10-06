import { getAuth } from "@clerk/nextjs/server";
import ImageKit from "@/configs/imageKit";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        // Get the data from the form
        const formData = await request.formData();
        const name = formData.get("name");
        const username = formData.get("username");
        const description = formData.get("description");
        const email = formData.get("email");
        const contact = formData.get("contact");
        const address = formData.get("address");
        const image = formData.get("image");

        if (!name || !username || !description || !email || !contact || !address || !image) {
            return NextResponse.json({ message: "missing store info" }, { status: 400 });
        }

        // Check if the user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId }
        })

        if (store) {
            return NextResponse.json({ status: store.status });
        }
        // Check is username is already taken
        const isUsernameTaken = await prisma.store.findFirst({
            where: { username: username.toLowerCase() }
        })

        if (isUsernameTaken) {
            return NextResponse.json({ message: "username is already taken" }, { status: 400 });
        }

        // Image Upload to ImageKit
        const buffer = Buffer.from(await image.arrayBuffer());
        const response = await ImageKit.upload({
            file: buffer, //required
            fileName: image.name, //required
            folder: "logos"
        });           

        const optimizedImage = ImageKit.url({
            path: response.filePath,
            transformation: [
                {quality: "auto"},
                {format: "webp"},
                {width: "512"}
            ]
        });

        const newStore = await prisma.store.create({
            data: {
                userId,
                name,
                description,
                username: username.toLowerCase(),
                email,
                contact,
                address,
                logo: optimizedImage,
            }
        })

        // Link the store to the user
        await prisma.user.update({
            where: {id: userId},
            data: {store: {connect: {id: newStore.id}}}
        })
        
        return NextResponse.json({ message: "applied, waiting for approval" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });
    }
}

// Check if the user is already registered a store if yes then send the status of the store
export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        // Check if the user have already registered a store
        const store = await prisma.store.findFirst({
            where: { userId: userId }
        })

        if (store) {
            return NextResponse.json({ status: store.status });
        }

        return NextResponse.json({ status: "not_registered" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });        
    }

}    