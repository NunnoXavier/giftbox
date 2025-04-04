import { NextRequest, NextResponse } from 'next/server'
import { putProduto } from '@/db/produtos'
import { ProductDTO } from '@/types/types'

export const POST = async (request:NextRequest) => {    
    try {
        const body = await request.json()
        const produto:ProductDTO = { ...body }
    
        const result = await putProduto(produto)
   
        return NextResponse.json(result)        
    } catch (error:any) {
        return NextResponse.json(error)                
    }
}
