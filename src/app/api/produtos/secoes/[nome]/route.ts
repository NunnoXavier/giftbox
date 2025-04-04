import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest, { params }: {params: Promise<{ nome: string}>}) => {
    try {
        const { nome } = await params
        const res = await fetch(`https://dummyjson.com/products/category/${nome}`,{next: { revalidate: 3600 }})
        const data = await res.json()
        const products = data.products
        return NextResponse.json([...products])
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ error: error.message })
    }
}

