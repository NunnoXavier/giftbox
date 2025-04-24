import { toDateBr } from "@/services/utils"
import { Order } from "@/types/types"
import ItemPedido from "./ItemPedido"

const Pedido = ({ pedido }:{ pedido: Order }) => {
    const status = pedido.status === "pending"? "Aguardando Pagamento" : 
                   pedido.status === "canceled"? "Pedido Cancelado" :
                   pedido.status === "paid"? "Pedido em Preparação" :
                   pedido.status === "sent"? `Pedido Enviado em ${toDateBr(pedido.shipping?.date)}` :
                   pedido.status === "received"? `Pedido Recebido em ${toDateBr(pedido.shipping?.receivedAt)}` :
                   ""
    const recebidoPor = pedido.shipping?.receivedBy? 
        `Recebido por ${pedido.shipping?.receivedBy}`
        :false

    
    return (
        <div key={pedido.id} className="mb-2 flex flex-col gap-2 bg-white w-md md:w-2xl border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between">
                <span className="text-gray-700 text-sm">{`Pedido Realizado no dia ${toDateBr(pedido.date)}`}</span>
                <span className="text-gray-700 text-sm">{`Total: ${pedido.payment?.value?.toFixed(2)}`}</span>
                <span className="text-gray-700 text-sm">{`Pedido Nº F025-C22EG-${pedido.id?.toString().padStart(9,'0')}`}</span>
            </div>
            <div className="flex gap-2">
                <span className="font-semibold text-lg text-gray-700">{status}</span>
                <span>{recebidoPor? recebidoPor : ""}</span>                
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