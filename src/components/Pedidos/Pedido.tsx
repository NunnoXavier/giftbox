import { toDateBr } from "@/services/utils"
import { Order } from "@/types/types"
import ItemPedido from "./ItemPedido"

type TStatus = {
    title: string,
    color: string
} 

const Pedido = ({ pedido }:{ pedido: Order }) => {
    const status:TStatus = pedido.status === "pending"? { title: "Aguardando Pagamento", color: "text-yellow-500" }: 
                   pedido.status === "canceled"? { title: "Pedido Cancelado", color: "text-texto-alerta" }:
                   pedido.status === "paid"? { title: "Pedido em Preparação", color: "text-green-500" }:
                   pedido.status === "sent"? { title: `Pedido Enviado em ${toDateBr(pedido.shipping?.date)}`, color: "text-texto-link" }:
                   pedido.status === "received"? { title: `Pedido Recebido em ${toDateBr(pedido.shipping?.receivedAt)}`, color: "text-texto" }:
                   { title: "Status desconhecido", color: "text-texto-alerta" }
    const recebidoPor = pedido.shipping?.receivedBy? 
        `Recebido por ${pedido.shipping?.receivedBy}`
        :false

    
    return (
        <div key={pedido.id} 
            className="my-4 flex flex-col gap-2 bg-white w-full border 
                    border-borda rounded-lg p-4 shadow-md"
        >
            <div className="flex flex-col md:flex-row gap-2 md:justify-between">
                <span className="text-texto text-sm">{`Realizado no dia ${toDateBr(pedido.date)}`}</span>
                <span className="text-texto text-sm">{`Total: ${pedido.payment?.value?.toFixed(2)}`}</span>
                <span className="text-texto text-sm">{`Pedido Nº F025-C22EG-${pedido.id?.toString().padStart(9,'0')}`}</span>
            </div>
            <div className="flex gap-2">
                <span className={`${ status.color } font-semibold text-xl`}>{status.title}</span>
                <span>{recebidoPor? recebidoPor : ""}</span>
                <span className="text-texto text-sm">{pedido.status === "received"? `Entregue em ${toDateBr(pedido.shipping?.receivedAt)}` : ""}</span>
            </div>
            <div className="flex flex-col gap-2">
                {
                    pedido.products?.map((produto) => (
                        <ItemPedido key={produto.idProduct} item={produto}/>
                    ))
                }

            </div>

        </div>        
    )
}

export default Pedido