import { getPedidos } from "@/db/pedidos"
import { AuthTokenPayload } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request:NextRequest) => {    
    try {        
        const cookieStore = request.cookies
    
        const rawCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")?.value || ""
        const { role }:AuthTokenPayload = jwtDecode(rawCookie)
            
        if(role !== "admin"){
            return NextResponse.json({ data: null, error: "Você não tem permissão para acessar esta rota" },{ status: 400 })
        }

        const { data:pedidos, error:errorPedido } = await getPedidos()    
        
        if(!pedidos){
            return NextResponse.json({ data: null, error: 'DB: ' + errorPedido },{ status: 400 })
        }
        
        return NextResponse.json({ data:pedidos , error: null })
    } catch (error:any) {
        return NextResponse.json({ data:null , error: error.message },{ status: 400 })
        
    }
}