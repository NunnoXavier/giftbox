'use server'

import { Order } from "@/types/types"
import { actionObterToken } from "../cookies/actionObterToken"
import { revalidateTag } from "next/cache"
import { actionRevalidarPedidos } from "./actionRevalidarPedidos"

export const actionUpdatePedido = async (pedido:Order) => {
    try {

        const token = await actionObterToken()

        const res = await fetch(`http://localhost:3000/api/pedidos`,{
            method: 'POST',
            headers: token.header,
            body: JSON.stringify(pedido)
        })
    
        if(res.status !== 200){
            throw new Error('erro ao atualizar pedido')
        }
        
        const {data, error}: {data:Order, error:string} = await res.json()
        if(!data){
            throw new Error(error)
        }

        actionRevalidarPedidos(token.idUser)

        return data
    } catch (error:any) {
        throw new Error(error.message)
    }
}