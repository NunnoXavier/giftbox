import { putProdutosPromocao } from "@/db/promocoes"
import { Promocao } from "@/types/types"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    const body:Promocao = await request.json()

    const {data, error} = await putProdutosPromocao(body)

    if(error) {
        return NextResponse.json({ data: null, error: error })
    }

    if(!data) {
        return NextResponse.json({ data: null, error: "DB: Erro ao atualizar produtos da promoção" })
    }
    
    return NextResponse.json({ data: data, error: null })
}