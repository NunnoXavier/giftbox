import { getUsuarios } from '@/db/usuarios'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const res = await getUsuarios()

    return NextResponse.json(res)
}