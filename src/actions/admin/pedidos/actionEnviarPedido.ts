'use server'

import { actionObterToken } from "@/actions/cookies/actionObterToken"
import { Order } from "@/types/types"
import { actionEnviarEmail } from "@/actions/usuarios/actionEnviarEmail"
import { revalidateTag } from "next/cache"

export const actionEnviarPedido = async (pedido: Order) => {
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

        revalidateTag(`pedidos`)
        revalidateTag(`pedidos-${pedido.idUser}`)

        await actionEnviarEmail(
            'SI GiftBox', 
            `Seu pedido de número ${pedido.id?.toString()} foi postado!
            Você pode acompanhar o status do seu pedido em: <a href="http://localhost:3000/pedidos">http://localhost:3000/pedidos</a>`
        )
        
        return pedidoAlterado

    } catch (error:any) {
        console.log(error.message)
        return false
    }
}