import { getPromocao } from "@/db/promocoes"
import { NextRequest, NextResponse } from "next/server"

export const GET = async ( _request: NextRequest, { params }: { params: Promise<{ id: number }> } ) => {
    try {
        const { id } = await params

        const { data, error } = await getPromocao(id)
    
        if(!data) {
            return NextResponse.json({ data: null, error: error },{ status: 400 })
        }
    
        return NextResponse.json({ data: data, error: null })
        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message },{ status: 400 })
        
    }
}