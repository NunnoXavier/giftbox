'use server'

import { fetchUsuario } from "@/serverCache/fetchUsuario"
import { fetchUsuariosAdmin } from "@/serverCache/fetchUsuariosAdmin"

export const actionEnviarEmail = async (assunto: string, mensagem: string, email?: string) => {
    try {        
        const usuario = email? await userByEmail(email) : await fetchUsuario()
        if(!usuario){
            console.log('actionEnviarEmail: usuario não encontrado')
            return false
        }

        const respEmail = await fetch('http://localhost:3000/api/email',{
            method: 'POST',
            body: JSON.stringify({ 
                to: usuario.email, 
                subject: assunto, 
                html: `<p>Olá ${usuario.firstName},<br> ${mensagem}</p>` })
        })


        if(!respEmail.ok) {
            console.log('actionEnviarEmail: erro ao enviar email')
            return false
        }
        
        const { data, error }: { data: any, error: string } = await respEmail.json()
        if(error) {
            console.log('actionEnviarEmail: ', error)
            return false
        }

        return true
    } catch (error:any) {
        console.log(error.message)
        return false
    }

}

const userByEmail = async (email:string) => {
    const users = await fetchUsuariosAdmin()
    return users.find((user) => user.email === email)
}