'use server'

import { Order } from "@/types/types"
import { actionEnviarEmail } from "../usuarios/actionEnviarEmail"
import { fetchUsuario } from "@/cachedFetchs/fetchUsuario"

export const actionCancelar = async (pedido: Order) => {
    try {
        const res = await fetch('http://localhost:3000/api/mock/cancelar',{
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
            console.log('actionCancelarPedido: usuario não encontrado')
            return false
        }

        await actionEnviarEmail('Pedido Cancelado', `Seu pedido de número ${pedido.id?.toString()} foi cancelado!
        O Valor pago já foi reembolsado e pode levar até 5 dias para ser creditado na sua conta
        em caso de débito ou PIX, em caso de crédito até a data de fechamento da fatura. Para mais  informações entre em contato com o seu banco.
        Você pode acompanhar o status do seu pedido em: <a href="http://localhost:3000/pedidos">http://localhost:3000/pedidos</a>`)

        return true

    } catch (error:any) {
        console.log(error.message)
        return false
    }
}