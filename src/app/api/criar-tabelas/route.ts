import criarTabelas from "@/db/criarTabelas"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request:NextRequest) => {
    try {
        const res = await criarTabelas()
        return NextResponse.json(res)        
    } catch (error:any) {
        return NextResponse.json({error})        
    }

}