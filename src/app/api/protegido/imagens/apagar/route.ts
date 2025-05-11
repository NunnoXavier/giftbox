import { NextRequest, NextResponse } from 'next/server'
import { removeImage } from '@/db/images'

export const DELETE = async (request:NextRequest) => {    
    try {
        const { id }:{ id:number } = await request.json()
        const { data, error } = await removeImage({ id: id})
        if(!data){
            return NextResponse.json({ data: null, error: 'erro ao remover imagem no banco de dados: ' + error })            
        }

        return NextResponse.json({ data, error: null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
    }
}
