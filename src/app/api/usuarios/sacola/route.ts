import { NextRequest, NextResponse } from "next/server"
import { jwtDecode, JwtPayload } from 'jwt-decode'

import { cookies } from "next/headers"

interface AuthTokenPayload extends JwtPayload {
    id: number,
    email: string,
    role: |'client'|'admin',
}

export const GET = async(request:NextRequest) => {
//     const authToken = request.cookies.get('SIGIFTBOX_AUTH_TOKEN')
//     if(!authToken){
//         return NextResponse.json({ data: null, error: "usuario não autenticado"})        
//     }

// const usuario = jwtDecode(authToken.value) as AuthTokenPayload

const cookieStore = await cookies()
const token = cookieStore.get('SIGIFTBOX_AUTH_TOKEN')
console.log(token)

    return NextResponse.json('ok')

}