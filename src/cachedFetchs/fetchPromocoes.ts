'use server'

import { Promocao } from "@/types/types"

export const fetchPromocoes = async () => {    

    const res = await fetch(`http://localhost:3000/api/produtos/promocoes`, {
        method: 'GET',
        next: {
            tags: ['promocoes'],
            revalidate: 60 * 60 * 24, // 1 dia
        }
    })

    const { data: promo, error: errorPromo }:{ data: Promocao[], error: string } = await res.json()
    if (!promo) {
        console.log(errorPromo)
        return null
    }
    
    return promo
}