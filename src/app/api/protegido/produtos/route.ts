import { getProdutos } from "@/db/produtos";
import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const { data:produtos, error:errorProdutos } = await getProdutos()
        if(!produtos){
            return NextResponse.json({data:null, error:errorProdutos},{ status: 400 })            
        }

        return NextResponse.json({ data:produtos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message },{ status: 400 })
    }
}

