import { toDateBr } from "@/services/utils"
import { Order } from "@/types/types"

export type TStatus = {
    title: string,
    color: string
} 

export const actionGetTitleColorPedido =  (pedido: Order) => {
    const status:TStatus = pedido.status === "pending"? { title: "Aguardando Pagamento", color: "text-yellow-500" }:
                   pedido.status === "canceled"? { title: "Pedido Cancelado", color: "text-texto-alerta" }:
                   pedido.status === "expired"? { title: "Pedido Expirado", color: "text-texto-label" }:
                   pedido.status === "paid"? { title: "Pedido em Preparação", color: "text-green-500" }:
                   pedido.status === "sent"? { title: `Pedido Enviado em ${toDateBr(pedido.shipping?.date)}`, color: "text-texto-link" }:
                   pedido.status === "received"? { title: `Pedido Recebido em ${toDateBr(pedido.shipping?.receivedAt)}`, color: "text-texto" }:
                   { title: "Status desconhecido", color: "text-texto-alerta" }
    return status
}