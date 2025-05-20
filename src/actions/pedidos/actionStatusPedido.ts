'use server'

import { fetchUsuario } from "@/cachedFetchs/fetchUsuario"
import { ChStatus } from "@/types/types"
import { actionEnviarEmail } from "../usuarios/actionEnviarEmail"
import { actionObterToken } from "../cookies/actionObterToken"
import { revalidateTag } from "next/cache"

export const actionStatusPedido = async (novoStatus: ChStatus) => {
    try {
        const token = await actionObterToken()
        const res = await fetch('http://localhost:3000/api/pedidos/status',{                    
            method: 'POST',
            headers: token.header,
            body: JSON.stringify(novoStatus)
        })

        const { data:resultStatus, error:errorResultStatus} = await res.json()
                    
        if(!resultStatus){
            console.log(errorResultStatus)
            return false
        }

        revalidateTag(`pedidos-${token.idUser}`)

        const usuario = await fetchUsuario()
        if(!usuario){
            console.log('actionStatusPedido: usuario não encontrado')
            return false
        }

        return await actionEnviarEmail('Pedido Confirmado', `Seu pedido de número ${novoStatus.idPedido.toString()} foi confirmado!
        Você pode acompanhar o status do seu pedido em: <a href="http://localhost:3000/pedidos">http://localhost:3000/pedidos</a>`)

    } catch (error) {
        console.log(error)
        return false        
    }
}