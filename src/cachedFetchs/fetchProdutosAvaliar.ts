import { fetchPedidos } from './fetchPedidos'
import { AuthTokenPayload, Order, OrderProduct, Review } from '../types/types'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import { actionObterToken } from '@/actions/usuarios/actionObterToken'

type TProdutosAvaliar = {
    order: Order,
    orderProduct: OrderProduct,
    review: Review
}

export const fetchProdutosAvaliar = async () => {
    const token = await actionObterToken()

    const res = await fetch('http://localhost:3000/api/pedidos/avaliar',{
        method: 'GET',
        headers: token.header,
        cache: "force-cache",
        next: {
            tags: [`avaliar-${token.idUser}`]
        }
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