import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    const { token } = await req.json()
    
    const c = await cookies()
    c.set("SIGIFTBOX_AUTH_TOKEN", token, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 dias em segundo
        sameSite: "strict",
    })

    return NextResponse.json(null, {
        status: 200,
        headers: {
            "Set-Cookie": c.toString(),
        },
    })

}