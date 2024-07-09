import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET(req: Request, {params} : {params: { sportId: string }}) {
    const sport = await prisma.sports.findFirst({
        where: {
            id: parseInt(params.sportId)
        }
    })

    if(sport){
        return Response.json({
            data: sport
        })
    }


    return Response.json({
        message:"Esporte não encontrado"
    })

}


export async function PATCH(req: Request, {params} : {params: { sportId: string }}) {
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


    const sportId = params.sportId
    const body = await req.json()
    const sport = await prisma.sports.findFirst({
        where: {
            id: parseInt(sportId)
        }
    })

    if(sport){
        try{
            const response = await prisma.sports.update({
                where: {
                    id: parseInt(sportId)
                },
                data:{
                    name: '',
                    playersPerTeam: 1,
                    rulesUrl: ''
                }
            })

            return Response.json({
                message: `Esporte: ${sport.name} atualizado com sucesso`,
                data: response
            });
        } catch(err){
            console.log(err)
        }

    }

    return Response.json({message: 'Sport not found'})


}

export async function DELETE(req: Request, {params} : {params: { sportId: string }}) {
    const sportId = params.sportId
    const sport = await prisma.sports.findFirst({
        where: {
            id: parseInt(sportId)
        }
    })

    if(sport){
        try{
            const response = await prisma.sports.delete({
                where: {
                    id: parseInt(sportId)
                }
            })

            return Response.json({
                message: `Esporte: ${sport.name} deletado com sucesso`,
                data: response
            })
        } catch (err){
            console.log(err)
        }
    }

    return Response.json({message: "Deleting Sport"});
}