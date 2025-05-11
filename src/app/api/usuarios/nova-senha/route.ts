import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { getUsuarios, updateSenha } from '@/db/usuarios'
import { User } from '@/types/types'
import { cookies } from 'next/headers'
import { AuthTokenPayload } from '@/types/types'


export const POST = async (request:NextRequest) => {    
    try {
        const { token: tokenUsuario, password: senhaUsuario } = await request.json()

        const tokenVerificado = jwt.verify(tokenUsuario, process.env.JWT_SECRET || "key_secret") as AuthTokenPayload

        if(!tokenVerificado){
            return NextResponse.json({data: null, error: "token inválido" })
        }
        
        const idUsuario = tokenVerificado.id
        const senhaCriptografada = bcrypt.hashSync(senhaUsuario)

        const {data:users, error} = await getUsuarios({campo:'id', valor: idUsuario })
        if(!users){
            return NextResponse.json({ data: null, error: 'DB: ' + error })    
        }

        const user:User = users[0]
        if(!user){
            return NextResponse.json({data: null, error: "id não encontrado" })
        }

        const { error:errorDB } = await updateSenha({ id: idUsuario, novaSenha: senhaCriptografada })

        if(errorDB){
            return NextResponse.json({data: null, error: 'DB: ' + errorDB })
        }        
        
        const secret = process.env.JWT_SECRET || "key_secret"
    
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret , { expiresIn: "30d" })
    
        const c = await cookies()
        c.set("SIGIFTBOX_AUTH_TOKEN", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 dias em segundo
            sameSite: "strict",
         })    
        
        return NextResponse.json({data:token, error: null})
        
    } catch (error:any) {
        return NextResponse.json({data:null, error: error.message})        
    }
}
