import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { getUsuarios } from '@/db/usuarios'
import { User } from '@/types/types'
import { cookies } from 'next/headers'

type Credentials = { email:string, password:string }

export const POST = async (request:NextRequest) => {    
    const { email, password }:Credentials = await request.json()

    const {data:users, error} = await getUsuarios({campo:'email', valor: email })
    if(!users){
        return NextResponse.json({ data: null, error: "email não encontrado" },{status: 401})

    }

    const user:User = users[0]
    console.log(user)
    
    if(!user){
        return NextResponse.json({error: "email não encontrado" },{status: 401})
    }

    if(!bcrypt.compareSync(password, user.password)){
        return NextResponse.json({error: "senha incorreta" },{status: 401}) 
    }
    
    const secret = process.env.JWT_SECRET || "key_secret"

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret , { expiresIn: "30d" })

    const c = await cookies()
    c.set("SIGIFTBOX_AUTH_TOKEN", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dias em segundo
     })

    return NextResponse.json({token})
}
