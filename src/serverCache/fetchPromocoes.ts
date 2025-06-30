'use server'

import { Promocao } from "@/types/types"

const umaHora = 3600

export const fetchPromocoes = async () => {    

    const res = await fetch(`http://localhost:3000/api/produtos/promocoes`, {
        method: 'GET',
        next: {
            tags: ['promocoes'],
            revalidate: umaHora * 12
        }
    })

    const { data: promo, error: errorPromo }:{ data: Promocao[], error: string } = await res.json()
    if (!promo) {
        console.log(errorPromo)
        return null
    }
    
    return promo
}

export const fetchPromocao = async (id:number) => {    

    const res = await fetch(`http://localhost:3000/api/produtos/promocoes/${id.toString()}`, {
        method: 'GET',
        next: {
            tags: [`promocoes${id.toString()}`],
            revalidate: umaHora * 12
        }
    })

    const { data: promo, error: errorPromo }:{ data: Promocao, error: string } = await res.json()
    if (!promo) {
        console.log(errorPromo)
        return null
    }
    
    return promo
}