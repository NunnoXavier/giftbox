import { putUsuario } from "@/db/usuarios"
import { User } from "@/types/types"
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers"
import { mailer } from "@/services/mailer/nodemailer"

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
        
        const c = await cookies()
        c.set("SIGIFTBOX_AUTH_TOKEN", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 dias em segundo
            sameSite: "strict",
        })        
        
        //enviar email de boas vindas
        const { data:respEmail, error:errorEmail } = await mailer.sendMail({ 
            to: meuUsuario.email, 
            subject: 'Boas Vindas', 
            html: `
                <p><strong>Bem vindo(a), ${meuUsuario.firstName}!</strong></p>
                <p>Agora voc&ecirc; pode aproveitar toda a nossa plataforma e ofertas exclusivas!</p>
                <p>Confirme o recebimento deste email clicando no link <a href="http://localhost:3000/dashboard" target="_blank">http://localhost:3000/dashboard</a> e receba um presente exclusivo!</p>
                <p>&nbsp;</p>
                <p>Atenciosamente,</p>
                <p><span style="color: #ff00ff;"><em><strong>Si</strong></em></span> <strong>Giftbox</strong></p>
            ` 
        }) 
        
        if(errorEmail){
            console.log(errorEmail)
        }

        return NextResponse.json({data:token, error: null})
        
    } catch (error:any) {
        return NextResponse.json({ data:null, error: 'ROUTE: '+error.message })        
    }

}
