import { PrismaClient } from "@prisma/client";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()


export async function GET(req: NextRequest) {

    const response = await prisma.sports.findMany()

    return NextResponse.json({response});
}


export async function POST(req: NextRequest) {
    const body = await req.formData();
    const file = (body.get('rules') as File)

    const name = body.get('name')?.toString() || ''
    const playersPerTeam = body.get('playersPerTeam')?.toString() || '0'

    try {

        const upload = await put(file.name, file, {
            access: 'public'
        })

        const response = await prisma.sports.create({
            data: {
                name,
                playersPerTeam: parseInt(playersPerTeam),
                rulesUrl: upload.url
            }
        })

        return NextResponse.json({
            message: "Esporte cadastrado com sucesso",
            data: response
        });
    } catch (error) {
        console.log(error)
    }
}