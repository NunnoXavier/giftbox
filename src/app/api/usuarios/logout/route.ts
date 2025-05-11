import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest) => {
    const url = request.nextUrl
    const urlRedirecionar = url.clone()
    const cookie = await cookies()
    cookie.delete("SIGIFTBOX_AUTH_TOKEN")    
    urlRedirecionar.pathname = '/'
    return NextResponse.redirect(urlRedirecionar)
}