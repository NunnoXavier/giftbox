import { NextRequest, NextResponse } from 'next/server'
import { putImage } from '@/db/produtos'
import { ImageDTO } from '@/types/types'

export const POST = async (request:NextRequest) => {    
    try {
        const body = await request.json()
        console.log(body)
        const Image:ImageDTO = { ...body }
        console.log(Image)
    
        const { data, error } = await putImage(Image.url,Image.idproduct)
   
        return NextResponse.json({ data, error: null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
    }
}
