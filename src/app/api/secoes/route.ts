import { getCategorias } from "@/db/secoes"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
    const data = await getCategorias()
    return NextResponse.json(data)
}