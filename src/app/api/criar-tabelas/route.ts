import criarTabelas from "@/db/criarTabelas"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const res = await criarTabelas()
        return NextResponse.json(res)        
    } catch (error:any) {
        return NextResponse.json({error})
    }

}