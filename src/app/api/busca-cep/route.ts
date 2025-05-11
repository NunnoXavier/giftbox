import { NextRequest, NextResponse } from "next/server"
import { dadosCep } from "@/services/consultaCep"

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const cep = searchParams.get('cep')

    if(!cep){
        return NextResponse.json({ data: null, error: "CEP inválido" })
    }
    const { data:dados, error:errorCep } = await dadosCep(cep)

    if(errorCep){
        return NextResponse.json({ data: null, error: errorCep })
    }

    return NextResponse.json({ data: dados, error: null })
}