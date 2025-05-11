import { Order } from "@/types/types"

export const createStorePedido = () => {  
    try {
        const storage = localStorage.getItem('pedido')
        const pedido = storage? JSON.parse(storage) : null
        return pedido        
    } catch (error:any) {
        console.log(error.message)
    }
}

export const updatePedido = async(novoPedido:Order):Promise<Order> => {
    try {        
        if(!novoPedido.id || novoPedido.id === 0){
            throw new Error('id do pedido não informado')
        }
        const res = await fetch(`http://localhost:3000/api/pedidos`,{
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(novoPedido)
        })
    
        if(res.status !== 200){
            throw new Error('erro ao atualizar pedido')
        }
        
        const {data:pedido, error}: {data:Order, error:string} = await res.json()
        
        if(!pedido){
            throw new Error(error)        
        }
    
        localStorage.setItem('pedido', JSON.stringify(pedido))
        return pedido
    } catch (error:any) {
        throw new Error(error.message)
    }
}

export const inserirPedido = async(novoPedido:Order):Promise<Order> => {
    try {
        const res = await fetch(`http://localhost:3000/api/pedidos`,{
            method: 'PUT',
            credentials: "include",
            body: JSON.stringify(novoPedido)
        })
    
        if(res.status !== 200){
            throw new Error('erro ao atualizar pedido')
        }
        
        const {data:pedido, error}: {data:Order, error:string} = await res.json()
        
        if(!pedido){
            throw new Error(error)        
        }
        
        localStorage.setItem('pedido', JSON.stringify(pedido))
        return pedido                
    } catch (error:any) {
        throw new Error(error.message)
    }
}