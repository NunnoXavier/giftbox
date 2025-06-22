import { actionGetTitleColorPedido } from "@/actions/pedidos/actionGetTitleColorPedido"
import { fetchPedidos } from "@/cachedFetchs/fetchPedidos"
import { toDateBr } from "@/services/utils"
import { Order, OrderStatus } from "@/types/types"

const PedidosEmAberto = async () => {
    const pedidos = await fetchPedidos()

    if(!pedidos){
        return <p>Erro ao buscar pedidos</p>
    }

    const statusFinalizados: OrderStatus[] = ["received","canceled","expired"]

    const pedidosEmAberto = pedidos.filter(pedido => pedido.status && !statusFinalizados.includes(pedido.status) ) 

    if(pedidosEmAberto.length === 0){
        return
    }

    return (
        <section className="flex-1 bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-texto">Pedidos em Andamento</h2>
            <ul className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {
                pedidosEmAberto.sort((a, b) => (b.id || 0) - (a.id || 0))
                .map((pedido) => (
                <li key={pedido.id} className="border-b-2 border-borda pb-4">
                    <a
                        href={`/pedido/${pedido.id}`}
                        className="text-sm text-texto"
                    >
                        Pedido #{pedido.id?.toString().padStart(7,'0')}
                    </a>
                    <p className=" flex text-xs text-texto gap-2">
                        Status:
                        <span className={`font-medium ${actionGetTitleColorPedido(pedido).color}`}>{actionGetTitleColorPedido(pedido).title}</span>
                    </p>

                    {
                        pedido.status !== "received"?
                        <p className="text-xs text-texto-label">Previsão de entrega: {toDateBr(pedido.dtprev)}</p>
                        : <></>
                    }                        

                </li>
                ))
            }
            </ul>
        </section>        
    )
}

export default PedidosEmAberto