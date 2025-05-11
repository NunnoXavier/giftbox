import { mailer } from "@/services/mailer/nodemailer"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const { to, subject, html } = await req.json()
        const { data, error } = await mailer.sendMail({ to, subject, html })
        if (error) {
            return NextResponse.json({ data: null, error })
        }
        return NextResponse.json({ data, error:null })        
    } catch (error:any) {
        return NextResponse.json({ data: null, error: 'sendMail: ' + error.message })
    }
}