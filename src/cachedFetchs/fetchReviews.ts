'use server'

import { Review } from "@/types/types"

export const fetchReviews = async (idProduto?: number) => {
    try {
        const res = await fetch(`http://localhost:3000/api/produtos/reviews/${idProduto}`, {
            method: "GET",
            cache: "force-cache",
            next: {
                tags: [`reviews-${idProduto}`],
                revalidate: 60
            }
        })
        
        const { data, error }:{data: Review[], error:string} = await res.json()
        if(!data){
            console.log(error)
            return []
        }

        return data

    } catch (error:any) {
        console.log(error.message)
        return []
    }
}