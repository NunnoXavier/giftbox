import { NextRequest, NextResponse } from 'next/server'
import { getUsuarios } from '@/db/usuarios'
import { Convert, Order, User } from '@/types/types'
import { jwtDecode } from 'jwt-decode'
import { AuthTokenPayload } from '@/types/types' 
import {  getPedidos, putEntregaPedido, putPagtoPedido, putPedido, putProdutoPedido } from '@/db/pedidos'


export const PUT = async (request:NextRequest) => {    
    const body:Order = await request.json()
    const cookieStore = request.cookies

    const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
    const { id }:AuthTokenPayload = jwtDecode(rawCookie)

    const {data:users, error} = await getUsuarios({campo:'id', valor: id })
    if(!users){
        return NextResponse.json({ data: null, error: error })
        
    }
    
    const user:User = users[0]
    if(!user || user.id !== id){
        return NextResponse.json({ data: null, error: 'usuário logado não confere com o usuario informado no pedido' },{status: 500})        
    }
    
    const { data:idPedido, error:errorPedido } = await putPedido(body)    
    if(!idPedido){
        return NextResponse.json({ data: null, error: 'DB: ' + errorPedido })
    }    
    
    if(body.payment){
        const { data:idPagamento, error:errorPagamento } = await putPagtoPedido(idPedido, body.payment)    
        if(!idPagamento){
            return NextResponse.json({ data: null, error: 'DB: ' + errorPagamento })
        }
    }

    if(body.shipping){
        const { data:idEntrega, error:errorEntrega } = await putEntregaPedido(idPedido, body.shipping)    
        if(!idEntrega){
            return NextResponse.json({ data: null, error: 'DB: ' + errorEntrega })
        }
    }

    if(body.products){
        const { data:idProduto, error:errorProduto } = await putProdutoPedido(idPedido, body.products)    
        if(!idProduto){
            return NextResponse.json({ data: null, error: 'DB: ' + errorProduto })
        }
    }
    
    return NextResponse.json({ data: { ...body, id: idPedido}, error: null })

}

export const GET = async (request:NextRequest) => {    
    const cookieStore = request.cookies

    const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
    const { id }:AuthTokenPayload = jwtDecode(rawCookie)
   
    const { data:pedidos, error:errorPedido } = await getPedidos({campo:"iduser", valor: id})    
    if(!pedidos){
        return NextResponse.json({ data: null, error: 'DB: ' + errorPedido })
    }
    
    return NextResponse.json({ data:pedidos , error: null })

}
