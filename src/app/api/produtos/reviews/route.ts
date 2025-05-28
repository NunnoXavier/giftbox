import { getReviews } from "@/db/reviews"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        
        const { data:reviews, error } = await getReviews()

        if(!reviews){
            return NextResponse.json({ data: null, error: error })
        }

        return NextResponse.json({ data: reviews, error: null })
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
        
    }

}

