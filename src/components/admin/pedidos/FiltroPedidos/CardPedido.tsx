import { somarData, toCurrencyBr, toDateBr } from "@/services/utils"
import { Order, User } from "@/types/types"

const traduzirStatus = (status: string): string => {
    switch (status) {
        case "pending": return "Pendente"
        case "paid": return "Pago"
        case "sent": return "Enviado"
        case "received": return "Recebido"
        case "canceled": return "Cancelado"
        case "expired": return "Exprado"
        default: return status
    }
}

type CardPedidoProps = {
    pedido: Order
    usuario: User
    fnEnviarPedido: (idPedido: number) => void
    fnCancelarPedido: (idPedido: number) => void
    fnReceberPedido: (idPedido: number) => void
}

const CardPedido = ({ pedido, usuario, fnEnviarPedido, fnCancelarPedido, fnReceberPedido }: CardPedidoProps) => {

    const canSend = pedido.status === "paid"
    const canCancel = ["pending","paid"].includes(pedido.status || "")
    const canReceive = pedido.status === "sent"

    return (
        <div key={pedido.id} className="bg-white flex flex-col  shadow-lg rounded-xl p-6 space-y-4 border border-borda">
            
            {/* Cabeçalho */}
            <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-xl font-bold text-gray-800">Pedido #{pedido.id}</h2>
                <span className="text-sm text-texto-label">Data: {toDateBr(pedido.date)}</span>
            </div>

            {/* Informações do cliente */}
            <div className="space-y-1">
                <h3 className="text-md font-semibold text-texto">
                    Cliente: {pedido.idUser} - {usuario?.firstName} {usuario?.lastName}
                </h3>
                <p className="text-sm text-texto-label">{usuario?.email}</p>
            </div>

            {/* Status e pagamento */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="text-gray-800">{traduzirStatus(pedido.status!)}</span>
                </div>
                <div>
                    <span className="font-semibold">Total:</span>{" "}
                    {toCurrencyBr(pedido.payment?.value)}
                </div>
            </div>

            {/* Informações de envio */}
            <div className="bg-gray-50 rounded-md p-4 space-y-1 border">
                <h4 className="font-semibold text-texto mb-1">Informações de Envio</h4>
                <p className="text-sm"><strong>Endereço:</strong> {pedido.shipping?.address}</p>
                <p className="text-sm"><strong>Cidade:</strong> {pedido.shipping?.city}</p>
                <p className="text-sm"><strong>UF:</strong> {pedido.shipping?.state}</p>
                <p className="text-sm"><strong>CEP:</strong> {pedido.shipping?.postalCode}</p>
                <p className="text-sm"><strong>OBS:</strong> {pedido.shipping?.obs}</p>
                <p className="text-sm"><strong>Enviado em:</strong> {toDateBr(pedido.shipping?.date)}</p>
                <p className="text-sm"><strong>Previsão:</strong> 
                    {
                        somarData(
                            ['pending', 'paid'].includes(pedido.status!) ? 
                                pedido.date 
                                : 
                                pedido.shipping?.date, pedido.shipping?.daysprev
                            )
                    }
                </p>
                <p className="text-sm"><strong>Valor Frete:</strong> {toCurrencyBr(pedido.shipping?.value)}</p>
                <p className="text-sm"><strong>Recebido Em:</strong> {toDateBr(pedido.shipping?.receivedAt)}</p>
                <p className="text-sm"><strong>Recebido Por:</strong> {pedido.shipping?.receivedBy}</p>
                <p className="text-sm"><strong>Cod. Rastreio:</strong> {pedido.shipping?.trackingCode}</p>
            </div>

            {/* Produtos */}
            <div>
                <h4 className="font-semibold text-texto mb-1">Produtos</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-texto">
                    {pedido.products?.map((product) => (
                        <li key={product.id}>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{product.qtde?.toString().padStart(2, "0")}x</span>
                                    <span>{product.title}</span>
                                </div>
                                <span className="text-xs text-texto-label">ID: {product.id?.toString().padStart(6, "0")}</span>
                                <hr className="border-borda mt-2" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Ações */}
            <div className="flex justify-end gap-3 pt-4 border-t mt-auto">
                <button
                    onClick={() => fnEnviarPedido(pedido.id ?? 0)}
                    disabled={!canSend}
                    className={`${canSend? 'bg-blue-700 hover:bg-blue-600':'bg-gray-200'} 
                     text-white px-4 py-2 rounded  transition`}
                >
                    Enviar
                </button>
                <button
                    onClick={() => fnReceberPedido(pedido.id ?? 0)}
                    disabled={!canReceive}
                    className={`${canReceive? 'bg-green-700 hover:bg-green-600':'bg-gray-200'}
                      text-white px-4 py-2 rounded  transition`}
                >
                    Receber
                </button>
                <button
                    onClick={() => fnCancelarPedido(pedido.id ?? 0)}
                    disabled={!canCancel}
                    className={`${canCancel? 'bg-red-600 hover:bg-red-500':'bg-gray-200'} 
                     text-white px-4 py-2 rounded  transition`}
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default CardPedido
