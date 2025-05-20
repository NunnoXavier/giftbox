'use server'

import { Order } from "@/types/types"
import { actionStatusPedido } from "./actionStatusPedido"

export const actionPagar = async (pedido: Order) => {
    try {
        const res = await fetch('http://localhost:3000/api/mock',{
            method: 'POST',
            body: JSON.stringify(pedido)
        })
        
        const { data:result, error:errorResult} = await res.json()
        
        if(!result){
            console.log(errorResult)
            return false
        }else{
            return await actionStatusPedido({ idPedido: Number(pedido.id), novoStatus: "paid" })
        }

    } catch (error:any) {
        console.log(error.message)
        return false
    }
}