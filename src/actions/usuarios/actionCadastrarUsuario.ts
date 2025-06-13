'use server'

import { User } from "@/types/types"

export const actionCadastrarUsuario = async (usuario: User) => {
    try {
        const res = await fetch(`http://localhost:3000/api/usuarios/cadastrar`,  { 
            method: 'PUT',
            headers: {
                "Content-type": "Application-json"
            },
            body: JSON.stringify(usuario),
        })        

        const {data:token, error}:{data:string, error:string} = await res.json()
        if(!token){
            return error
        }
    
        return { token }
        
    } catch (error:any) {
        console.log(error)
        return error.message
        
    }
}