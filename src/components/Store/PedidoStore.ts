import { Order } from "@/types/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const createQueryPedido = (idPedido: number) => {
    const fetchPedido = async():Promise<Order> => {
        const res = await fetch(`http://localhost:3000/api/pedidos/${idPedido.toString()}`,{
            method: 'GET',
            credentials: "include",
        })

        if(res.status !== 200){
            throw new Error('erro ao buscar pedido')
        }
        
        const {data:pedido, error}: {data:Order, error:string} = await res.json()
        
        if(!pedido){
            throw new Error(error)        
        }
        return pedido        
    }
    
    return  useQuery<Order>({
        queryKey: ['pedido'],
        queryFn: fetchPedido,
        placeholderData: keepPreviousData,
    },)
}

export const updatePedido = async(novoPedido:Order):Promise<Order> => {
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

    return novoPedido        
}

export const inserirPedido = async(novoPedido:Order):Promise<Order> => {
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

    return pedido        
}