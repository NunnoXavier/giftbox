import { NextRequest, NextResponse } from 'next/server'
import { putImage } from '@/db/produtos'
import { ImageDTO } from '@/types/types'
import { Console } from 'console'

export const POST = async (request:NextRequest) => {    
    try {
        const body = await request.json()
        
        if(!body){
            return NextResponse.json({ data: null, error: 'erro backend: nenhuma imagem enviada no body' })            

        }
        const Image:ImageDTO = { ...body }
        
        
        const { data, error } = await putImage(Image.url,Image.idproduct)
        if(!data){
            return NextResponse.json({ data: null, error: 'erro ao gravar imagem no banco de dados: ' + error })            
        }

        return NextResponse.json({ data, error: null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
    }
}
