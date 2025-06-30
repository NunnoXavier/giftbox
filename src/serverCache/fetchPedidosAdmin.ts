'use server'

const umaHora = 3600

import { actionObterToken } from "@/actions/usuarios/actionObterToken"
import { Order } from "@/types/types"

export const fetchPedidosAdmin = async () => {
    const token = await actionObterToken()
    const res = await fetch(`http://localhost:3000/api/protegido/pedidos`, {
        method: "GET",
        headers: token.header,
        cache: "force-cache",
        next: {            
            tags: [`pedidos`],
            revalidate: umaHora,
        }
    })

    const { data, error }:{ data:Order[], error:string } = await res.json()

    if(!data){
        console.log(error)   
        return null  
    }

    return data
}