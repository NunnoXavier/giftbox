import { getUsuarios } from '@/db/usuarios'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: {params: Promise<{ email: string}>}) => {
    const { email } = await params
    const { data:usuarios, error } = await getUsuarios({campo:"email", valor:email})
    
    if(!usuarios){
        return NextResponse.json({data: null, error: error })
    }
    const usuario = usuarios.find((u) => u.email === email)
    if(!usuario){
        return NextResponse.json({data: null, error: 'usuário não encontrado' })
    }
    

    return NextResponse.json({ data: usuario, error: null })
}