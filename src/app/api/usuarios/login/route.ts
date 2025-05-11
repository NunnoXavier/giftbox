import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { getUsuarios } from '@/db/usuarios'
import { User } from '@/types/types'
import { cookies } from 'next/headers'

type Credentials = { email:string, password:string }

export const POST = async (request:NextRequest) => {    
    try {
        const { email, password }:Credentials = await request.json()
    
        const {data:users, error} = await getUsuarios({campo:'email', valor: email })
        if(!users){
            return NextResponse.json({ data: null, error: 'DB: ' + error })    
        }

        // if(users.length === 0){
        //     return NextResponse.json({ data: null, error: "usuario nao encontrado" })
        // }
        const user:User = users[0]
        
        if(!user){
            return NextResponse.json({data: null, error: "email não encontrado" })
        }
    
        if(!bcrypt.compareSync(password, user.password || "")){
            return NextResponse.json({data: null, error: "senha incorreta" })
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
