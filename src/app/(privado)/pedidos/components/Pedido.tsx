import { somarData, toCurrencyBr, toDateBr } from "@/services/utils"
import { Order } from "@/types/types"
import ItemPedido from "@/app/(privado)/pedido/[id]/components/ItemPedido"
import { actionGetTitleColorPedido } from "@/actions/pedidos/actionGetTitleColorPedido"
import Link from "next/link"

const Pedido = ({ pedido }:{ pedido: Order }) => {
    const status = actionGetTitleColorPedido(pedido)
    const recebidoPor = pedido.shipping?.receivedBy && pedido.status === "received"?
        `Recebido por ${pedido.shipping?.receivedBy}`
        :false
    const Previsao = pedido.shipping?.daysprev && pedido.status === "sent"?  
        `Previsão de entrega em ${somarData(pedido.shipping.date, pedido.shipping?.daysprev)}`
        :false

    
    return (
        <div key={pedido.id} 
            className="my-4 flex flex-col gap-2 bg-white w-full border 
                    border-borda rounded-lg shadow-md"
        >
            {/* Header */}
            <div className="flex gap-2 justify-between bg-gray-500 rounded-t-lg p-2
                text-white text-sm">
                <span>{`Realizado no dia ${toDateBr(pedido.date)}`}</span>
                <span>{`Total: ${toCurrencyBr(pedido.payment?.value)}`}</span>
                <span>{`Pedido Nº F025-C22EG-${pedido.id?.toString().padStart(9,'0')}`}</span>
            </div>

            <div className="flex flex-col p-2">
                {/* Status */}
                <div className="flex flex-col">
                    <span className={`${ status.color } font-semibold text-xl`}>{status.title}</span>
                    <span className="text-sm ">{recebidoPor? recebidoPor : ""}</span>
                    <span className="text-sm ">{Previsao? Previsao : ""}</span>
                </div>
                {/* Produtos */}
                <div className="flex flex-col py-8 gap-2">
                    {
                        pedido.products?.map((produto) => (
                            <ItemPedido key={produto.idProduct} item={produto}/>
                        ))
                    }
                </div>
                {/* Detalhes */}
                <div className="w-full text-center text-texto-link hover:underline">
                    <Link href={`/pedido/${pedido.id}`}>Detalhes do Pedido</Link>
                </div>
            </div>

        </div>        
    )
}

export default Pedido