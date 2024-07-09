import prisma from "@/utils/prisma";
import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: Request) {
    const mockEsportes = [
        {
            id: 1,
            name: 'Futebol',
            playersPerTeam: 11,
            rules: 'Rule 1, Rule 2, Rule 3'
        },
        {
            id: 2,
            name: 'Basquete',
            playersPerTeam: 5,
            rules: 'Rule 1, Rule 2, Rule 3'
        },
        {
            id: 3,
            name: 'Handball',
            playersPerTeam: 7,
            rules: 'Rule 1, Rule 2, Rule 3'
        },
        {
            id: 4,
            name: 'Futsal',
            playersPerTeam: 5,
            rules: 'Rule 1, Rule 2, Rule 3'
        },
        {
            id: 5,
            name: 'Futevolei',
            playersPerTeam: 2,
            rules: 'Rule 1, Rule 2, Rule 3'
        }
    ]

    const response = await prisma.sports.findMany()

    return NextResponse.json({response});
}


export async function POST(req: NextRequest) {
    const body = await req.formData();
    const file = (body.get('rules') as File)

    try {

        const upload = await put(file.name, file, {
            access: 'public'
        })

        console.log(upload)
        /*const response = await prisma.sports.create({
            data: {
                name: '',
                playersPerTeam: 1,
                rulesUrl: ''
            }
        })*/

        return NextResponse.json({
            message: "Esporte cadastrado com sucesso",
            data: upload
        });
    } catch (error) {
        console.error(error);
    }
}