import { getCategorias } from "@/db/secoes"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    try {
        const { data, error } = await getCategorias()
        if(!data){
            return NextResponse.json({ data: null, error: error },{ status: 400 })
        }

        return NextResponse.json({ data:data, error: null })        
    } catch (error:any) {
        return NextResponse.json({ data:null, error: error.message },{ status: 400 })        
        
    }
}