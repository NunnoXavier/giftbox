import { NextRequest, NextResponse } from 'next/server'
import { putImage } from '@/db/images'
import { Image } from '@/types/types'

export const POST = async (request:NextRequest) => {    
    try {
        const body = await request.json()
        
        if(!body){
            return NextResponse.json({ data: null, error: 'erro backend: nenhuma imagem enviada no body' })            
        }
        
        const { data, error } = await putImage(body.url,body.idproduct)
        if(!data){
            return NextResponse.json({ data: null, error: 'erro ao gravar imagem no banco de dados: ' + error })            
        }

        return NextResponse.json({ data, error: null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
    }
}
