import { getUsuarios } from "@/db/usuarios"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { mailer } from "@/services/mailer/nodemailer"

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json()

        const {data:users, error} = await getUsuarios({campo:'email', valor: email })
        if(!users){
            return NextResponse.json({ data: null, error: 'DB: ' + error })    
        }
        
        if(users.length === 0){
            return NextResponse.json({ data: null, error: "email nao encontrado" })
        }

        const user = users[0]

        const secret = process.env.JWT_SECRET || "key_secret"
    
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, secret , { expiresIn: "15m" })

        //enviar email
        const { error: errorEmail } = await mailer.sendMail({
            to: email,
            subject: "Recuperação de senha",
            html: `<h1>Recuperação de senha</h1>
            Para criar uma nova senha, clique no link <a href="http://localhost:3000/recuperar-senha/nova-senha?id=${user.id}&token=${token}">http://localhost:3000/recuperar-senha/nova-senha?id=${user.id}&token=${token}</a>`,
        })

        if(errorEmail){
            return NextResponse.json({ data: null, error: errorEmail })
        }

        return NextResponse.json({data:token, error: null})        
        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
    }

}
