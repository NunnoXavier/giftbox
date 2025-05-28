import { NextRequest, NextResponse } from "next/server";

export const POST = async ( request:NextRequest ) => {
    const body = await request.json()

    const fakeApiCall = () => new Promise<{ data: string }>(resolve => setTimeout(() => resolve({ data: "Mock API Response" }), 3000))

    await fakeApiCall()

    return NextResponse.json({ data: body, error: null })

}