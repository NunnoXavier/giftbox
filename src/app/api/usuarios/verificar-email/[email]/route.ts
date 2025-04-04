import { getUsuarios } from '@/db/usuarios'
import { User } from '@/types/types'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: {params: Promise<{ email: string}>}) => {
    const { email } = await params
    const usuarios:User[] = await getUsuarios({campo:"email", valor:email})

    const usuario = usuarios.find((u) => u.email === email)


    return NextResponse.json({emailExiste: usuario? true : false })
}