'use server'

import { User, AuthTokenPayload } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export const fetchUsuariosAdmin = async () => {
    try {
        const cookieStore = await cookies()
        const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
    
        const { role } = jwtDecode(cookieToken?.value!) as AuthTokenPayload
    
        if(role !== "admin"){
            throw new Error("Você não tem permissão para acessar esta rota")
        }
        
        const res = await fetch('http://localhost:3000/api/protegido/usuarios', {
            cache: 'force-cache',
            headers: {
                Cookie: `SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}`
            },
            next: {
                tags: [`usuarios`]
            }
        })
    
        const { data:usuarios, error }:{data:User[], error:string} = await res.json()
        if(!usuarios){
            throw new Error(error)        
        }
        return usuarios
        
    } catch (error:any) {
        throw new Error(error.message)
    }
}
