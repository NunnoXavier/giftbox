'use server'

import { User } from "@/types/types"
import { cookies } from "next/headers"

export const fetchUser = async () => {    
    const cookieStore = await cookies()
    const token = cookieStore.get('SIGIFTBOX_AUTH_TOKEN')
    const res = await fetch('http://localhost:3000/api/usuarios',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Cookie: `SIGIFTBOX_AUTH_TOKEN=${token?.value}`
        },
    })

    const { data: usuario, error: errorUsuario }:{ data: User, error: string } = await res.json()
    if (!usuario) {
        console.error(errorUsuario)
        return null
    }
    
    return usuario
}