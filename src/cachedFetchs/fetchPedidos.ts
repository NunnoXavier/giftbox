import { AuthTokenPayload, Order } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export const fetchPedidos = async ():Promise<Order[] | null> => {
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN") 
    if(!cookieToken){
        console.log("fetchPedidos: Não tem token")
        return null
    } 

    const { id } = jwtDecode(cookieToken.value) as AuthTokenPayload
    const res = await fetch(`http://localhost:3000/api/pedidos`, {
        method: "GET",
        headers: { Cookie:`SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}` },
        cache: "force-cache",
        next: {            
            tags: [`pedidos-${id}`]
        }
    })

    const { data, error }:{ data:Order[], error:string } = await res.json()

    if(!data){
        console.log(error)
        return null
    }

    return data
}