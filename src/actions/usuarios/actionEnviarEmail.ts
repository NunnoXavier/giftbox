'use server'

import { fetchUsuario } from "@/cachedFetchs/fetchUsuario"

export const actionEnviarEmail = async (assunto: string, mensagem: string, email?: string) => {
    try {
        const usuario = await fetchUsuario()
        if(!usuario){
            console.log('actionEnviarEmail: usuario não encontrado')
            return false
        }

        await fetch('http://localhost:3000/api/email',{
            method: 'POST',
            body: JSON.stringify({ 
                to: email || usuario.email, 
                subject: assunto, 
                html: `<p>Olá ${usuario.firstName},<br> ${mensagem}</p>` })
        })        
        
        return true
    } catch (error) {
        console.log(error)
        return false        
    }

}
