import { getUsuarios } from '@/db/usuarios'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: {params: Promise<{ email: string}>}) => {
    try {
        const { email } = await params
        const { data:usuarios, error } = await getUsuarios({campo:"email", valor:email})
        
        if(!usuarios){
            return NextResponse.json({data: null, error: 'erro ao procurar email: ' + error })
        }
    
        return NextResponse.json({ data: usuarios.length === 0, error: null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: 'erro ao verificar email: ' + error.message })        
    }
}