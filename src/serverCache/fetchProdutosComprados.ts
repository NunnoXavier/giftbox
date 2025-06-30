import { fetchPedidos } from './fetchPedidos'
import { Order } from '../types/types'

export const fetchProdutosComprados = async (somenteProdutosRecebidos:boolean = false) => {
    const pedidos:Order[] = await fetchPedidos() || []
    if (!pedidos) {
        console.log('Não foi possível obter os pedidos')
        return null
    }

    const pedidosRecebidos = pedidos.filter((pedido) => (
        pedido.products &&
        pedido.products.length > 0 &&
        (somenteProdutosRecebidos? pedido.status === 'received' : true)
    ))

    const produtosRecebidos = pedidosRecebidos
    .map((pedido) =>  (pedido.products))
    .flat()

    const produtosSanitizados = produtosRecebidos
    .filter((produto) => !produto? false : true)

    return produtosSanitizados
}

