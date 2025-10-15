import { openai } from "@/configs/openai";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


async function main(base64Image, mimeType) {
    const messages = [
        {
            "role": "system",
            "content": 'You are a product listing assistant. Your job is to     analyze the image of a product and generate structed data. Respond only with raw JSON (no code block, no markdown, no explanations). The JSON must strictly follow this schema: {"name": string, //Short Product Name "description": string, //Marketing Friendly Description for this Product}'
        },          
        {
        "role": "user",
            "content": [
                {
                "type": "text",
                "text": "Analyze the image and generate a short product name and a marketing friendly description for this product. Respond only with raw JSON (no code block, no markdown, no explanations). The JSON must strictly follow this schema: {name: string, description: string}",
                },
                {
                "type": "image_url",
                "image_url": {
                    "url": `data:${mimeType};base64,${base64Image}`
                },
                },
            ],
        }
    ];

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages,
    });

    const raw = response.choices[0].message.content

    // Remove ```json or ``` wrappers if they exist
    const cleaned = raw.replace(/```json|```/g, "").trim();

    let parsed;

    try {
        parsed = JSON.parse(cleaned);
    } catch (error) {
        throw new Error("Failed to parse JSON response from OpenAI");
    }

    return parsed;
}

export async function POST(request) {
    try {
        const {userId} = getAuth(request)
        const isSeller = await authSeller(userId)

        if(!isSeller){
            return NextResponse.json({error: 'Not Authorized'}, {status: 401})
        }

        const { base64Image, mimeType} = await request.json()

        const result = await main(base64Image, mimeType)

        return NextResponse.json({...result})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error: error.code || error.message}, {status: 400})
    }
}