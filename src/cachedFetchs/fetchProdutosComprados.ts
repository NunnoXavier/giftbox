import { fetchPedidos } from './fetchPedidos'
import { Order } from '../types/types'

export const fetchProdutosComprados = async () => {
    const pedidos:Order[] = await fetchPedidos() || []
    if (!pedidos) {
        return null
    }

    return pedidos.filter((pedido) => (
        pedido.status === 'received' &&
        pedido.products 
        && pedido.products.length > 0
    ))
    .map((pedido) => pedido.products)
    .flat()    
}

