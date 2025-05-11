import { toDateBr } from "@/services/utils"
import { Order } from "@/types/types"
import ItemPedido from "./ItemPedido"

type TStatus = {
    title: string,
    color: string
} 

const Pedido = ({ pedido }:{ pedido: Order }) => {
    const status:TStatus = pedido.status === "pending"? { title: "Aguardando Pagamento", color: "text-yellow-500" }: 
                   pedido.status === "canceled"? { title: "Pedido Cancelado", color: "text-red-500" }:
                   pedido.status === "paid"? { title: "Pedido em Preparação", color: "text-green-500" }:
                   pedido.status === "sent"? { title: `Pedido Enviado em ${toDateBr(pedido.shipping?.date)}`, color: "text-blue-500" }:
                   pedido.status === "received"? { title: `Pedido Recebido em ${toDateBr(pedido.shipping?.receivedAt)}`, color: "text-gray-700" }:
                   { title: "Status desconhecido", color: "text-red-700" }
    const recebidoPor = pedido.shipping?.receivedBy? 
        `Recebido por ${pedido.shipping?.receivedBy}`
        :false

    
    return (
        <div key={pedido.id} 
            className="mb-2 flex flex-col gap-2 bg-white w-md md:w-2xl border 
                    border-gray-200 rounded-lg p-4"
        >
            <div className="flex justify-between">
                <span className="text-gray-700 text-sm">{`Pedido Realizado no dia ${toDateBr(pedido.date)}`}</span>
                <span className="text-gray-700 text-sm">{`Total: ${pedido.payment?.value?.toFixed(2)}`}</span>
                <span className="text-gray-700 text-sm">{`Pedido Nº F025-C22EG-${pedido.id?.toString().padStart(9,'0')}`}</span>
            </div>
            <div className="flex gap-2">
                <span className={`${ status.color } font-semibold text-lg`}>{status.title}</span>
                <span>{recebidoPor? recebidoPor : ""}</span>
                <span className="text-gray-700 text-sm">{pedido.status === "received"? `Entregue em ${toDateBr(pedido.shipping?.receivedAt)}` : ""}</span>
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