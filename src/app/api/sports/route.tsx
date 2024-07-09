import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

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
    const body = await req.json();

    console.log(body)

    try {

        const response = await prisma.sports.create({
            data: {
                name: '',
                playersPerTeam: 1,
                rulesUrl: ''
            }
        })

        return NextResponse.json({
            message: "Esporte cadastrado com sucesso",
            data: response
        });
    } catch (error) {
        console.error(error);
    }
}