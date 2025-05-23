'use server'

import { Order } from "@/types/types"
import { actionStatusPedido } from "./actionStatusPedido"
import { actionEnviarEmail } from "../usuarios/actionEnviarEmail"
import { fetchUsuario } from "@/cachedFetchs/fetchUsuario"

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
        }

        const usuario = await fetchUsuario()
        if(!usuario){
            console.log('actionStatusPedido: usuario não encontrado')
            return false
        }


        const res2 = await actionStatusPedido({ idPedido: Number(pedido.id), novoStatus: "paid" })
        if (!res2) {
            console.log('actionStatusPedido: erro ao atualizar status do pedido')
            return false
        }

        await actionEnviarEmail('Pedido Confirmado', `Seu pedido de número ${pedido.id?.toString()} foi confirmado!
        Você pode acompanhar o status do seu pedido em: <a href="http://localhost:3000/pedidos">http://localhost:3000/pedidos</a>`)

        return true

    } catch (error:any) {
        console.log(error.message)
        return false
    }
}