import { getPedidos, updatePagtoPedido, updatePedido, updateEntregaPedido } from "@/db/pedidos"
import { AuthTokenPayload, Order } from "@/types/types"
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
            return NextResponse.json({ data: null, error: 'DB: ' + errorPedido },{ status: 400 })
        }
        
        const pedido:Order = pedidos[0]

        if(pedido.idUser !== id){
            console.log( pedido.idUser , id)
            return NextResponse.json({ data: null, error: 'Usuario logado não tem permissão para acessar este pedido' },{ status: 400 })        
        }
        
        return NextResponse.json({ data:pedido , error: null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: 'Rota: ' + error.message },{ status: 400 })        
    }
}

export const POST = async (request: NextRequest,{ params }: {params: Promise<{ id: string}>}) => {
    try {
        const { id:idPedido } = await params
        const novoPedido:Order = await request.json()
        const cookieStore = request.cookies

    
        const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
        const { id, role }:AuthTokenPayload = jwtDecode(rawCookie)
       
        const { data:pedidos, error:errorPedido } = await getPedidos({campo:"id", valor: idPedido})    
        if(!pedidos){
            return NextResponse.json({ data: null, error: 'DB: ' + errorPedido })
        }
        
        const pedido:Order = pedidos[0]

        if(pedido.idUser !== id){
            if(role !== 'admin'){
                return NextResponse.json({ data: null, error: 'Usuario logado não tem permissão para alterar este pedido' })        
            }
        }

        const { data:pedidoAlterado, error } = await updatePedido(novoPedido)    
        if(!pedidoAlterado){
            return NextResponse.json({ data: null, error: 'DB: ' + error })
        }        
        
        const { data:pagto, error:errorPagto } =  novoPedido.payment? await updatePagtoPedido(novoPedido.id!,novoPedido.payment) : { data: null, error: null }
        const { data:entrega, error:errorEntrega } =  novoPedido.shipping? await updateEntregaPedido(novoPedido.id!,novoPedido.shipping) : { data: null, error: null }

        if(errorPagto || errorEntrega){
            return NextResponse.json({ data: null, error: 'DB: ' + errorPagto || errorEntrega })
        }
        
        pedidoAlterado.payment = pagto || undefined
        pedidoAlterado.shipping = entrega || undefined

        return NextResponse.json({ data:pedidoAlterado , error: null })
        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: 'Rota: ' + error.message })        
    }
}