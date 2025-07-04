import { putUsuario } from "@/db/usuarios"
import { User } from "@/types/types"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const PUT = async (req: NextRequest) => {
    try {
        const user = await req.json()
    
        const meuUsuario:User = { ...user, password: bcrypt.hashSync(user.password) }    
    
        const { data:novoId, error } = await putUsuario(meuUsuario)
        if(!novoId){
            return NextResponse.json({ data:null, error: 'DB: ' + error })
        }
        
        const secret = process.env.JWT_SECRET || "key_secret"
        
        const token = jwt.sign({ id: novoId, email: meuUsuario.email, role: meuUsuario.role }, secret , { expiresIn: "30d" })
       
        return NextResponse.json({data:token, error: null})
        
    } catch (error:any) {
        return NextResponse.json({ data:null, error: 'ROUTE: '+error.message })        
    }

}
