'use server'

import { fetchUsuario } from "@/cachedFetchs/fetchUsuario"
import { fetchUsuariosAdmin } from "@/cachedFetchs/fetchUsuariosAdmin"

export const actionEnviarEmail = async (assunto: string, mensagem: string, email?: string) => {
    try {        
        const usuario = email? await userByEmail(email) : await fetchUsuario()
        if(!usuario){
            console.log('actionEnviarEmail: usuario não encontrado')
            return false
        }

        await fetch('http://localhost:3000/api/email',{
            method: 'POST',
            body: JSON.stringify({ 
                to: usuario.email, 
                subject: assunto, 
                html: `<p>Olá ${usuario.firstName},<br> ${mensagem}</p>` })
        })        
        
        return true
    } catch (error) {
        console.log(error)
        return false        
    }

}

const userByEmail = async (email:string) => {
    const users = await fetchUsuariosAdmin()
    return users.find((user) => user.email === email)
}