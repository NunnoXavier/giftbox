'use server'

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
            tags: [`pedidos-${id}`]
        }
    })

    const { data, error }:{ data:Order[], error:string } = await res.json()

    if(!data){
        throw new Error(error)        
    }

    return data
}