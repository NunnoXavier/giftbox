import { getUsuarios } from '@/db/usuarios'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: {params: Promise<{ email: string}>}) => {
    const { email } = await params
    const { data:usuarios, error } = await getUsuarios({campo:"email", valor:email})
    
    if(error){
        return NextResponse.json({data: null, error: error })
    }
    
    if(!usuarios){
        return NextResponse.json({data: null, error: 'cadastro de usuairios nao encontrado' })
    }
    

    return NextResponse.json({ data: usuarios.length === 0, error: null })
}