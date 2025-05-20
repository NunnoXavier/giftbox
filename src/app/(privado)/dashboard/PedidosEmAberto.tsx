import { fetchPedidos } from "@/cachedFetchs/fetchPedidos"
import { toDateBr } from "@/services/utils"
import { Order, OrderStatus } from "@/types/types"

const PedidosEmAberto = async () => {
    const pedidos = await fetchPedidos()

    if(!pedidos){
        return <p>Erro ao buscar pedidos</p>
    }

    const statusFinalizados: OrderStatus[] = ["received","canceled"]

    const pedidosEmAberto = pedidos.filter(pedido => !statusFinalizados.includes(pedido.status!) ) 

    if(pedidosEmAberto.length === 0){
        return
    }

type TStatus = {
    title: string,
    color: string
} 

const statusPedido = (pedido: Order):TStatus =>{
    return pedido.status === "pending"? { title: "Aguardando Pagamento", color: "text-yellow-500" }: 
                        pedido.status === "canceled"? { title: "Pedido Cancelado", color: "text-texto-alerta" }:
                        pedido.status === "paid"? { title: "Pedido em Preparação", color: "text-green-500" }:
                        pedido.status === "sent"? { title: `Pedido Enviado em ${toDateBr(pedido.shipping?.date)}`, color: "text-texto-link" }:
                        pedido.status === "received"? { title: `Pedido Recebido em ${toDateBr(pedido.shipping?.receivedAt)}`, color: "text-texto" }:
                        { title: "Status desconhecido", color: "text-texto-alerta" }
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
                        <span className={`font-medium ${statusPedido(pedido).color}`}>{statusPedido(pedido).title}</span>
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