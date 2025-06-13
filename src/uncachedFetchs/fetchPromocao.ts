'use server'

import { Promocao } from "@/types/types"

export const fetchPromocao = async (id:number) => {    

    const res = await fetch(`http://localhost:3000/api/produtos/promocoes/${id.toString()}`, {
        method: 'GET',
    })

    const { data: promo, error: errorPromo }:{ data: Promocao, error: string } = await res.json()
    if (!promo) {
        console.log(errorPromo)
        return null
    }
    
    return promo
}