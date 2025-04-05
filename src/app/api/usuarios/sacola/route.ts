import { NextRequest, NextResponse } from "next/server"
import { jwtDecode, JwtPayload } from 'jwt-decode'
import { getUsuarios } from "@/db/usuarios"
import { deleteSacola, getSacola, putSacola } from "@/db/sacola"
import { ProductCart } from "@/types/types"
import { cookies } from "next/headers"

interface AuthTokenPayload extends JwtPayload {
    id: number,
    email: string,
}

const pegarUsuarioDaRequest = async (request:NextRequest) => {
    const authToken = (await cookies()).get('SIGIFTBOX_AUTH_TOKEN')
    if(!authToken){
        return { data: null, error: "usuario não autenticado"}
    }
    
    const { email } = jwtDecode(authToken.value) as AuthTokenPayload
    
    if(!email){
        return { data: null, error: 'o campo "email" não existe no token de autenticação'}
    }
    
    const { data, error } = await getUsuarios({campo: "email", valor: email}) 
    if(!data){
        return { data: null, error: error }
    } 
    
    const usuario = data[0]
    if(!usuario.id){
        return { data: null, error: 'o campo "id" não existe no cadastro do usuario'}

    }

    return { data: usuario, error: null }
}


export const GET = async(request:NextRequest) => {
    
    const { data:usuario, error } = await pegarUsuarioDaRequest(request)

    if(!usuario){
        return NextResponse.json({ data: null, error: error})
    }
    
    const { data:sacola, error:erroSacola } = await getSacola({ idUser: usuario.id || 0 })
    
    if(!sacola){
        return NextResponse.json({ data: null, error: erroSacola})        

    }

    return NextResponse.json({ data: sacola, error: null})

}

export const PUT = async(request:NextRequest) => {
    const { data:usuario, error } = await pegarUsuarioDaRequest(request)

    if(!usuario){
        return NextResponse.json({ data: null, error: error})
    }
    
    const produtoSacola:ProductCart = await request.json()
        
    if(!produtoSacola){
        return NextResponse.json({ data: null, error: 'nenhum item enviado no corpo da requisição' })        
    }

    produtoSacola.idUser = usuario.id || 0

    const { data:result, error: errorSacola } = await putSacola(produtoSacola as ProductCart)

    if(!result){
        return NextResponse.json({ data: null, error: errorSacola})
    }

    return NextResponse.json({ data: produtoSacola, error: null})
}

export const DELETE = async(request:NextRequest) => {
    const { data:usuario, error } = await pegarUsuarioDaRequest(request)

    if(!usuario){
        return NextResponse.json({ data: null, error: error})
    }
    
    const produtoSacola:ProductCart = await request.json()
        
    if(!produtoSacola){
        return NextResponse.json({ data: null, error: 'nenhum item enviado no corpo da requisição' })        
    }

    produtoSacola.idUser = usuario.id || 0

    const { data:result, error: errorSacola } = await deleteSacola(produtoSacola as ProductCart)

    if(!result){
        return NextResponse.json({ data: null, error: errorSacola})
    }

    return NextResponse.json({ data: produtoSacola, error: null})
}


