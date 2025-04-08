import { NextRequest, NextResponse } from 'next/server'
import { putProduto, updateProduto } from '@/db/produtos'
import { ProductDTO } from '@/types/types'

export const PUT = async (request:NextRequest) => {    
    try {
        const body = await request.json()
        const produto:ProductDTO = { ...body }
    
        const { data, error } = await putProduto(produto)

        if(!data){
            return NextResponse.json({ data: null, error: error })
        }
        
        return NextResponse.json({ data: data, error: null })
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })
    }
}
export const POST = async (request:NextRequest) => {    
    try {
        const body = await request.json()
        const produto:ProductDTO = { ...body }
    
        const { data, error } = await updateProduto(produto)

        if(!data){
            return NextResponse.json({ data: null, error: error })
        }
   
        return NextResponse.json({ data: data, error: null })
    } catch (error:any) {
        return NextResponse.json({ data: null, error: error.message })                
    }
}
