'use server'

import { AuthTokenPayload, Review } from "@/types/types"
import { jwtDecode } from "jwt-decode"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const actionAvaliarProduto = async (item: Review) => {
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
    const { id } = jwtDecode(cookieToken?.value || "") as AuthTokenPayload
    const res = await fetch('http://localhost:3000/api/pedidos/avaliar',{
        method: 'POST',
        body: JSON.stringify(item),
        headers: { Cookie:`SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}` }
    })

    revalidateTag(`avaliar-${id}`)

    const { data, error } = await res.json()
    if(!data){
        console.log(error)
        return null
    }

    return data
}