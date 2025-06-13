import { putPromocao, updatePromocao, getPromocoes } from "@/db/promocoes";
import { Promocao } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
    try {

        const { data, error } = await getPromocoes()
    
        if(!data) {
            return NextResponse.json({ data: null, error: error })
        }
    
        return NextResponse.json({ data: data, error: null })
        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
        
    }
}

export const PUT = async (request: NextRequest) => {
    const body:Promocao = await request.json()

    const {data, error} = await putPromocao(body)

    if(error) {
        return NextResponse.json({ data: null, error: error })
    }

    if(!data) {
        return NextResponse.json({ data: null, error: "DB: Erro ao atualizar promoção" })
    }
    
    return NextResponse.json({ data: data, error: null })
}

export const POST = async (request: NextRequest) => {
    const body:Promocao = await request.json()

    const {data, error} = await updatePromocao(body)

    if(error) {
        return NextResponse.json({ data: null, error: error })
    }

    if(!data) {
        return NextResponse.json({ data: null, error: "DB: Erro ao atualizar promoção" })
    }
    
    return NextResponse.json({ data: data, error: null })
}