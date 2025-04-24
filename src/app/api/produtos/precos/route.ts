import { getCamposProdutos } from "@/db/produtos";
import { NextRequest, NextResponse } from "next/server";



export const GET = async (request: NextRequest) => {
    try {
        const { data:dataProdutos, error:errorProdutos } = await getCamposProdutos({ campos: ['id','price','discountPercentage'] })
        
        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }
        
        return NextResponse.json({ data:dataProdutos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}

