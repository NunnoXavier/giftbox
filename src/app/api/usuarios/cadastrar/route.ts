import { putUsuario } from "@/db/usuarios"
import { User } from "@/types/types"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"

export const PUT = async (req: NextRequest) => {
    try {
        const { usuario } = await req.json()
    
        const meuUsuario:User = { ...usuario, password: bcrypt.hashSync(usuario.password) }    
    
        const res = await putUsuario(meuUsuario)
        
    const secret = process.env.JWT_SECRET || "key_secret"

    const token = jwt.sign({ id: usuario.id, email: usuario.email, role: usuario.role }, secret , { expiresIn: "30d" })

    const c = await cookies()
    c.set("SIGIFTBOX_AUTH_TOKEN", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dias em segundo
     })        
    
        return NextResponse.json(res)
        
    } catch (error) {
        
    }

}
