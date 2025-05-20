import { actionInserirPedido } from "@/actions/pedidos/actionInserirPedido"
import { actionUpdatePedido } from "@/actions/pedidos/actionUpdatePedido"
import { Order } from "@/types/types"

export const createStorePedido = ():Order|null => {  
    try {
        const storage = sessionStorage.getItem('pedido')
        const pedido = storage? JSON.parse(storage) as Order : null
        return pedido        
    } catch (error:any) {
        console.log(error.message)
        return null
    }
}

export const updatePedido = async(novoPedido:Order):Promise<Order> => {
    try {        
        if(!novoPedido.id || novoPedido.id === 0){
            throw new Error('id do pedido não informado')
        }
        
        const pedido = await actionUpdatePedido(novoPedido)       
   
        sessionStorage.setItem('pedido', JSON.stringify(pedido))

        return pedido
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const inserirPedido = async(novoPedido:Order):Promise<Order> => {
    try {
        const pedido = await actionInserirPedido(novoPedido)
        
        sessionStorage.setItem('pedido', JSON.stringify(pedido))
        return pedido                
    } catch (error:any) {
        throw new Error(error.message)
    }
}