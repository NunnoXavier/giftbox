import { getCamposProdutos, updateEstoqueProduto } from "@/db/produtos";
import { NextRequest, NextResponse } from "next/server";



export const GET = async () => {
    try {
        const { data:dataProdutos, error:errorProdutos } = await getCamposProdutos({ campos: ['id','stock'] })
        
        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }
        
        return NextResponse.json({ data:dataProdutos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const { id, qtde } = await request.json()
        const { data:dataProdutos, error:errorProdutos } = await updateEstoqueProduto({ id, qtde })

        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})
        }

        return NextResponse.json({ data:dataProdutos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}