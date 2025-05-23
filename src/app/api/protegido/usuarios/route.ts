import { getUsuarios } from '@/db/usuarios'
import { AuthTokenPayload, User } from '@/types/types'
import { jwtDecode } from 'jwt-decode'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    try {
        const authToken = request.cookies.get('SIGIFTBOX_AUTH_TOKEN')
        
        if(!authToken){
            return NextResponse.json({ data: null, error: "token não informado" })
        }
        
        const { role } = jwtDecode(authToken.value) as AuthTokenPayload
        
        if(role !== "admin"){
            return NextResponse.json({ data: null, error: "você não tem permissão para acessar esta rota" })
        }

        const { data, error } = await getUsuarios()
    
        if(!data){
            return NextResponse.json({ data: null, error: error})
        }

        const usuarios:User[] = data.map((usuario) => {
            return {
                ...usuario,
                password: ""
            }
        })

        return NextResponse.json({data: usuarios, error: null})        
    } catch (error:any) {
        return NextResponse.json({data: null, error: error.message})        
    }    
}