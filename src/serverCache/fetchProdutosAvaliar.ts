import {  Order, OrderProduct, Review } from '../types/types'
import { actionObterToken } from '@/actions/usuarios/actionObterToken'

export type TProdutosAvaliar = {
    order: Order,
    orderProduct: OrderProduct,
    review: Review
}

const umaHora = 3600

export const fetchProdutosAvaliar = async () => {
    const token = await actionObterToken()

    const res = await fetch('http://localhost:3000/api/pedidos/avaliar',{
        method: 'GET',
        headers: token.header,
        cache: "force-cache",
        next: {
            tags: [`avaliar-${token.idUser}`],
            revalidate: umaHora * 24,
        }
    })

    const { data: itens, error }:{ data: TProdutosAvaliar[], error:string } = await res.json()
    if(!itens || itens.length === 0){
        console.log(error)
        return null
    }

    return itens.filter((item) => (
        item.order && item.order.status === 'received'
        && (!item.review.rating || item.review.rating === 0)
    ))
}