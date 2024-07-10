import { PrismaClient } from "@prisma/client";
import { del, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient

export async function GET(req: NextRequest, {params} : {params: { sportId: string }}) {
    const sport = await prisma.sports.findFirst({
        where: {
            id: parseInt(params.sportId)
        }
    })

    if(sport){
        return NextResponse.json({
            data: sport
        })
    }


    return NextResponse.json({
        message:"Esporte não encontrado"
    })

}


export async function PATCH(req: NextRequest, {params} : {params: { sportId: string }}) {
    const sportId = params.sportId

    const body = await req.formData();
    const file = (body.get('rules') as File || null)

    const name = body.get('name')?.toString() || ''
    const playersPerTeam = body.get('playersPerTeam')?.toString() || '0'


    const sport = await prisma.sports.findFirst({
        where: {
            id: parseInt(sportId)
        }
    })

    if(sport){

        let upload = {
            url: sport.rulesUrl
        }

        console.log(sport)

        if(file.name !== undefined){
            console.log('UNDEFINED E FODASE')
            upload = await put(file.name, file, {
                access: 'public'
            })
        }

        const updateData = {
            name,
            playersPerTeam: parseInt(playersPerTeam),
            rulesUrl: upload.url
        }

        try{
            const response = await prisma.sports.update({
                where: {
                    id: parseInt(sportId)
                },
                data: updateData
            })

            return NextResponse.json({
                message: `Esporte: ${sport.name} atualizado com sucesso`,
                data: response
            });
        } catch(err){
            return NextResponse.json({
                message: `Não foi possível cadastrar o Esporte: ${name}`,
                data: err
            });
        }
    }

    return NextResponse.json({message: `O esporte não foi encontrado`})


}

export async function DELETE(req: NextRequest, {params} : {params: { sportId: string }}) {
    const sportId = params.sportId
    const sport = await prisma.sports.findFirst({
        where: {
            id: parseInt(sportId)
        }
    })

    if(sport){
        try{
            await prisma.sports.delete({
                where: {
                    id: parseInt(sportId)
                }
            })
            await del(sport.rulesUrl)

            const response = await prisma.sports.findMany()

            return Response.json({
                message: `Esporte: ${sport.name} deletado com sucesso`,
                data: response
            })
        } catch (err){
            console.log(err)
        }
    }

    return Response.json({message: "Esporte não encontrado"});
}