'use server'

import { actionObterToken } from "@/actions/usuarios/actionObterToken"
import { Order } from "@/types/types"
import { actionEnviarEmail } from "@/actions/usuarios/actionEnviarEmail"
import { revalidateTag } from "next/cache"
import { actionRevalidarPedidos } from "@/actions/pedidos/actionRevalidarPedidos"

export const actionReceberPedido = async (pedido: Order) => {
    try {
        const token = await actionObterToken()

        const res = await fetch(`http://localhost:3000/api/pedidos/${pedido.id}`, {
            method: 'POST',
            headers: token.header,
            body: JSON.stringify(pedido)
        })

        const { data:pedidoAlterado, error }:{data:Order, error:string} = await res.json()
        if(!pedidoAlterado){
            throw new Error(error)
        }

        actionRevalidarPedidos(pedido.idUser!)

        await actionEnviarEmail(
            'SI GiftBox', 
            `Seu pedido de número ${pedido.id?.toString()} foi recebido!
            Você tem 7 dias para efetuar a devolução do seu pedido, contando a partir da data de recebimento deste email.   
            Basta acessar <a href="http://localhost:3000/pedidos">http://localhost:3000/pedidos</a> e clicar em "Devolver".`
        )
        
        return pedidoAlterado

    } catch (error:any) {
        console.log(error.message)
        return false
    }
}