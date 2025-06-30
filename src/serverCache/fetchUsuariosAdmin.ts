'use server'

import { User, AuthTokenPayload } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

const umDia = 60 * 60 * 24

export const fetchUsuariosAdmin = async () => {
    try {
        const cookieStore = await cookies()
        const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
    
        const { role } = jwtDecode(cookieToken?.value!) as AuthTokenPayload
    
        if(role !== "admin"){
            console.log("Você não tem permissão para acessar esta rota")
            return null
        }
        
        const res = await fetch('http://localhost:3000/api/protegido/usuarios', {
            cache: 'force-cache',
            headers: {
                Cookie: `SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}`
            },
            next: {
                tags: [`usuarios`],
                revalidate: umDia * 7
            }
        })
    
        const { data:usuarios, error }:{data:User[], error:string} = await res.json()
        if(!usuarios){
            console.log(error)        
            return null
        }
        return usuarios
        
    } catch (error:any) {
        console.log(error.message)
        return null
    }
}
