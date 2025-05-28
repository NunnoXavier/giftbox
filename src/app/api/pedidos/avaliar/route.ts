import { getJoinOrderReviews } from "@/db/joins/orders_reviews"
import { insertOrUpdateReview } from "@/db/reviews"
import { updateRate } from "@/db/rotinas/atualizarRate"
import { getUsuarios } from "@/db/usuarios"
import { AuthTokenPayload, Review, User } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
    try {
        const review:Review = await request.json()
        const cookieStore = request.cookies
    
        const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
        const { id }:AuthTokenPayload = jwtDecode(rawCookie)
    
        const {data:users, error} = await getUsuarios({campo:'id', valor: id })
        if(!users){
            return NextResponse.json({ data: null, error: 'DB: ' + error })
            
        }
        
        const user:User = users[0]
        if(!user || user.id !== id){
            return NextResponse.json({ data: null, error: 'usuário logado não confere com o usuario informado no pedido' })
        }
    
        review.reviewerEmail = user.email
        review.reviewerName = user.firstName

        const { data: reviewData, error: reviewError } = await insertOrUpdateReview(review)
        if(!reviewData){
            return NextResponse.json({ data: null, error: reviewError })
        }

        await updateRate(review.idProduct)

        return NextResponse.json({ data: reviewData, error: null })
        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })        
    }

}

export const GET = async (request: NextRequest) => {
    try {
        const cookieStore = request.cookies
    
        const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
        const { id }:AuthTokenPayload = jwtDecode(rawCookie)
    
        const {data:users, error} = await getUsuarios({campo:'id', valor: id })
        if(!users){
            return NextResponse.json({ data: null, error: 'DB: ' + error })            
        }

        const user:User = users[0]
        if(!user || user.id !== id){
            return NextResponse.json({ data: null, error: 'usuário logado não confere com o usuario informado no pedido' })
        }
        
        const  {data:dataReviews, error:reviewsError} = await getJoinOrderReviews({ campo:'orders.iduser', valor: user.id })
        if(!dataReviews){
            return NextResponse.json({ data: null, error: reviewsError })
        }

        return NextResponse.json({ data: dataReviews, error: null })

    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })        
    }
}