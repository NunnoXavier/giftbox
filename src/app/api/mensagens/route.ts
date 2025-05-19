import { insertMessage } from "@/db/mensagens"
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const { createdAt, name, email, subject, message } = await req.json()

    if(!name || !email || !subject || !message) {
        return NextResponse.json({ data: null, error: 'Missing required fields' })
    }

    const { data: newMessage, error } = await insertMessage({ createdAt, name, email, subject, message })
    if(error) {
        return NextResponse.json({ data: null, error: error })
    }
    
    return NextResponse.json({ data: newMessage, error: null })
}