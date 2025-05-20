import { User } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export const fetchUsuario = async () => {
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")

    const { id } = jwtDecode(cookieToken?.value!) as { id: number }
    
    const res = await fetch('http://localhost:3000/api/usuarios', {
        cache: 'force-cache',
        headers: {
            Cookie: `SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}`
        },
        next: {
            tags: [`usuario-${id}`]
        }
    })

    const { data:usuario, error }:{data:User, error:string} = await res.json()
    if(!usuario){
        console.log(error)
        return null
    }
    return usuario
}
