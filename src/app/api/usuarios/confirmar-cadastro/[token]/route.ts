import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export const GET = async (_req: NextRequest, { params }: { params: Promise<{ token: string }> }) => {
    try {
        const token = (await params).token
    
        const secret = process.env.JWT_SECRET as string
        const { id } = jwt.verify(token, secret) as { id: string }
    
        if(!id) {
            return NextResponse.json({ data: null, error: 'Token inválido' },{ status: 400 })
        }
    
        return NextResponse.json({ data: id, error: null })
        
    } catch (error: any) {
        return NextResponse.json({ data: null, error: error.message },{ status: 400 })        
    }
}