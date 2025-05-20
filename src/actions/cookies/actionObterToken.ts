'use server'

import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export const actionObterToken = async () => {
    try {
        const cookieStore = await cookies()
        const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
        const { id } = jwtDecode(cookieToken?.value as string) as { id:string }
        
        return {
            header: { Cookie:`SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}` },
            idUser: Number(id)
        }
    } catch (error) {
        console.log(error)
        return { 
            header:{ Cookie:"" }, idUser:0
        }
    }
}
