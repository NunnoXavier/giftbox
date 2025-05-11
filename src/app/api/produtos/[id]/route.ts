import { getProdutos } from "@/db/produtos";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest,{ params }: {params: Promise<{ id: string}>}) => {
    try {
        const { id } = await params
        const { data:produtos, error:errorProdutos } = await getProdutos({campo:"id", valor:id})
        if(!produtos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }

    return NextResponse.json({ data: produtos , error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}
