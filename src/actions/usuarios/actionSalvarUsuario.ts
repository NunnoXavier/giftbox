'use server'

import { jwtDecode } from "jwt-decode"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const actionSalvarUsuario = async (dados:any) => {
    try {
        const cookieStore = await cookies()
        const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")

        const { id } = jwtDecode(cookieToken?.value!) as { id: string }

        const response = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                Cookie: `SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}`
            },
            body: JSON.stringify(dados)
        })

        const { data, error } = await response.json()
        if (error) {
            console.log(error)
            return false
        }

        revalidateTag(`usuario-${id}`)
        return data
    } catch (error:any) {
        console.log(error.message)
        return false
    }    
}