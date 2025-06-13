'use server'

import { ChStatus } from "@/types/types"
import { actionObterToken } from "../usuarios/actionObterToken"
import { actionRevalidarPedidos } from "./actionRevalidarPedidos"

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

        actionRevalidarPedidos(token.idUser)

        return true
    } catch (error) {
        console.log(error)
        return false        
    }
}