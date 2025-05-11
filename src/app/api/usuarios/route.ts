import { getUsuarios, updateUsuario } from '@/db/usuarios'
import { AuthTokenPayload } from '@/types/types'
import { jwtDecode } from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    try {
        const authToken = request.cookies.get('SIGIFTBOX_AUTH_TOKEN')
        
        if(!authToken){
            return NextResponse.json({ data: null, error: "token não informado" })
        }
        
        const { id } = jwtDecode(authToken.value) as AuthTokenPayload
        if(!id || isNaN(id)){
            return NextResponse.json({ data: null, error: 'id inválido'})
        }

        const { data, error } = await getUsuarios({campo:"id", valor:id})
    
        if(!data){
            return NextResponse.json({ data: null, error: error})
        }
    
    
        const usuario = data[0]
        delete usuario.password
    
        return NextResponse.json({data: usuario, error: null})        
    } catch (error:any) {
        return NextResponse.json({data: null, error: error.message})        
    }    
}

export const POST = async (request: NextRequest) => {
    try {
        const authToken = request.cookies.get('SIGIFTBOX_AUTH_TOKEN')
        
        if(!authToken){
            return NextResponse.json({ data: null, error: "token não informado" })
        }
        
        const { id } = jwtDecode(authToken.value) as AuthTokenPayload
        if(!id || isNaN(id)){
            return NextResponse.json({ data: null, error: 'id inválido'})
        }

        const { data, error } = await getUsuarios({campo:"id", valor:id})
    
        if(!data){
            return NextResponse.json({ data: null, error: error})
        }    
    
        const usuario = data[0]

        const novoUsuario = await request.json()
    
        const { data:update, error:errorUpdate } = await updateUsuario({ ... novoUsuario, id:usuario.id })
    
        if(!update){
            return NextResponse.json({ data: null, error: errorUpdate})
        }
    
        return NextResponse.json({data: update, error: null})        
    } catch (error:any) {
        return NextResponse.json({data: null, error: error.message})        
        
    }
}