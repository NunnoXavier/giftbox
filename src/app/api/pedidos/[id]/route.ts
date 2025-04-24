import { getEntregaPedido, getPagtoPedido, getPedidos, getProdutosPedido } from "@/db/pedidos"
import { AuthTokenPayload, Convert, Order, OrderDTO } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest,{ params }: {params: Promise<{ id: string}>}) => {
    try {
        const { id:idPedido } = await params
        const cookieStore = request.cookies
    
        const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
        const { id }:AuthTokenPayload = jwtDecode(rawCookie)
       
        const { data:pedidos, error:errorPedido } = await getPedidos({campo:"id", valor: idPedido})    
        if(!pedidos){
            return NextResponse.json({ data: null, error: 'DB: ' + errorPedido })
        }
        
        const pedido:Order = pedidos[0]

        if(pedido.idUser !== id){
            console.log( pedido.idUser , id)
            return NextResponse.json({ data: null, error: 'Usuario logado não tem permissão para acessar este pedido' })        
        }
        
        return NextResponse.json({ data:pedido , error: null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: 'Rota: ' + error.message })        
    }
}