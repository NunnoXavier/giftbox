import { getReviews } from "@/db/reviews"
import { NextResponse } from "next/server"

export const GET = async (request: Request, { params }: { params:Promise<{ idProduto: number }> }) => {
    try {
        const { idProduto } = await params
        const { data:reviews, error } = await getReviews({ campo: "idProduct", valor: idProduto })

        if(!reviews){
            return NextResponse.json({ data: null, error: error })
        }
        
        return NextResponse.json({ data: reviews, error: null })
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
        
    }

}

