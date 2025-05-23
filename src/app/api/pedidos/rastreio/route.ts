import { updateRastreioPedido } from "@/db/pedidos"
import { getUsuarios } from "@/db/usuarios"
import { AuthTokenPayload } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request:NextRequest) => { 
    try {
        
        const { idPedido, novoRastreio }:{ idPedido:number, novoRastreio:string } = await request.json()
        const cookieStore = request.cookies
    
        const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
        const { id,role }:AuthTokenPayload = jwtDecode(rawCookie)

        const {data:users, error} = await getUsuarios({campo:'id', valor: id })
        if(!users){
            return NextResponse.json({ data: null, error: 'DB: ' + error })
            
        }
        
        const user = users[0]
        if(!user || user.id !== id){
            if(role !== 'admin'){
                return NextResponse.json({ data: null, error: 'usuário logado não confere com o usuario informado no pedido' })
            }
        }        

        const { data:pedido, error:errorPedido } = await updateRastreioPedido(idPedido, novoRastreio)    
        if(!pedido){
            return NextResponse.json({ data: null, error: 'DB: ' + errorPedido })
        }
        
        if(!pedido.id){
            return NextResponse.json({ data: null, error: 'pedido não encontrado' })
        }

        revalidateTag(`pedidos-${id}`)
        revalidateTag(`pedidos-${pedido.idUser}`)
      
        return NextResponse.json({ data: pedido, error: null })
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })        
    }   

}