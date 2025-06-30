'use server'

const umaHora = 3600

import { actionObterToken } from "@/actions/usuarios/actionObterToken"
import { Order } from "@/types/types"

export const fetchPedidos = async () => {
    const token = await actionObterToken()
    const id = token.idUser
    const res = await fetch(`http://localhost:3000/api/pedidos`, {
        method: "GET",
        headers: token.header,
        cache: "force-cache",
        next: {            
            tags: [`pedidos-${id}`],
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

export const fetchPedido = async (id:number) => {
    const token = await actionObterToken()
    const res = await fetch(`http://localhost:3000/api/pedidos/${id}`, {
        method: "GET",
        headers: token.header,
        cache: "force-cache",
        next: {            
            tags: [`pedido-${id}`],
            revalidate: umaHora,
        }
    })

    const { data, error }:{ data:Order, error:string } = await res.json()

    if(!data){
        console.log(error)      
        return null  
    }

    return data
}