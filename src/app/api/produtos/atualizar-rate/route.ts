import { getProdutos } from "@/db/produtos"
import { updateRate } from "@/db/rotinas/atualizarRate"
import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        let trace = []
        const { data:produtos, error } = await getProdutos()
        if(!produtos){
            return NextResponse.json({ data: null, error: error })
        }
        for(let produto of produtos){
            const { data: produtoAtualizado, error: errorAtualizar } = await updateRate(produto.id!)
            if(!produtoAtualizado){
                trace.push({ id: produto.id, result: null, error: errorAtualizar })
            }else{
                trace.push({ id: produto.id, result: produtoAtualizado, error: null })
            }

        }

        revalidateTag(`produtos`)
        return NextResponse.json({ data: trace, error: null })

    }catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
    }

}