import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'

export const POST = async (req:NextRequest) => {
    try {
        const data = await req.formData()
        const file = data.get('file') as unknown as File
   
        if(!file ||file.size === 0 ){
            return NextResponse.json({ data: null, error: 'nenhum arquivo recebido' })
        }
    
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
    
        const uploadDir = path.join(process.cwd(), 'public/images',file.name)
        await writeFile(uploadDir,buffer)
        return NextResponse.json({ data: `/images/${file.name}`, error: null})        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: 'erro backend: '+ error.message})                
    }

}