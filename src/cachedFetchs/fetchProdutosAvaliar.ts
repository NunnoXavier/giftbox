import { fetchPedidos } from './fetchPedidos'
import { AuthTokenPayload, Order, OrderProduct, Review } from '../types/types'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

type TProdutosAvaliar = {
    order: Order,
    orderProduct: OrderProduct,
    review: Review
}

export const fetchProdutosAvaliar = async () => {
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN") 
    if(!cookieToken){
        console.log("fetchPedidos: Não tem token")
        return null
    } 

    const { id } = jwtDecode(cookieToken.value) as AuthTokenPayload    
    const res = await fetch('http://localhost:3000/api/pedidos/avaliar',{
        method: 'GET',
        headers: { Cookie:`SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}` },

        cache: 'no-store'
    })

    const { data: itens, error }:{ data: TProdutosAvaliar[], error:string } = await res.json()
    if(!itens || itens.length === 0){
        console.log(error)
        return []
    }

    return itens.filter((item) => (
        item.order && item.order.status === 'received'
        && (!item.review.rating || item.review.rating === 0)
    ))
}