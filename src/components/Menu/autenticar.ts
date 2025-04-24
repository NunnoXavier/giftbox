import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { AuthTokenPayload } from '@/types/types'

const initAuthToken:AuthTokenPayload = { id:0, email: "", role:"client" }

const verificarToken = async (rawToken:string):Promise<AuthTokenPayload> => {
    try {
        const SECRET = process.env.JWT_SECRET || "key_secret"
        const token = rawToken? jwt.verify(rawToken,SECRET) as AuthTokenPayload : initAuthToken
        return token
    } catch (error:any) {
        return { id:0, email: "", role:"client" }        
    }
}

export const token = async () => {
    const cookieStore = await cookies()
    const myCookie = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
    const rawToken = myCookie?.value || ""

    const token = await verificarToken(rawToken)
    if(myCookie && !token.id){
        redirect('http://localhost:3000/api/usuarios/logout')
    }
    return token
}