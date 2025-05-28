import { getCamposProdutos, updatePrecoProduto } from "@/db/produtos";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        const { data:dataProdutos, error:errorProdutos } = await getCamposProdutos({ campos: ['id','price','discountPercentage'] })
        
        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }

        const precos = dataProdutos.map((produto) => ({
            id: produto.id,
            price: produto.price,
            discountPercentage: produto.discountpercentage
        }))
        
        return NextResponse.json({ data:precos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const {  id, price, discountPercentage } = await request.json()
        const { data:dataProdutos, error:errorProdutos } = await updatePrecoProduto({ id, price, discountPercentage })
        
        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }
       
        return NextResponse.json({ data:dataProdutos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}

