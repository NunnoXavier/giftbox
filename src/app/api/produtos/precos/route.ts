import { getPromocoesVigentes } from "@/db/joins/promocoesVigentes";
import { getCamposProdutos, updatePrecoProduto } from "@/db/produtos";
import { NextRequest, NextResponse } from "next/server";

type Data = {
    id: number,
    price: number,
    discountPercentage: number,
    origin: string
}

export const GET = async () => {
    try {
        const { data:dataProdutos, error:errorProdutos } = await getCamposProdutos({ campos: ['id','price','discountPercentage'] })
        const { data:dataPromocoes, error:errorPromocoes } = await getPromocoesVigentes()

        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }
        if(!dataPromocoes){
            return NextResponse.json({data:null, error:errorPromocoes})            
        }

        const precos = dataProdutos.map((produto) => ({
            id: produto.id || 0,
            price: produto.price || 0,
            discountPercentage: produto.discountpercentage || 0,
            origin: 'cadastro'
        }))
        .concat(dataPromocoes.map((promocao) => ({
            id: promocao.idProduct,
            price: 0,
            discountPercentage: promocao.discountPercentage,
            origin: 'promocao'
        })))
        .reduce((acc, curr) => {
            const existing = acc.find((item:Data) => item.id === curr.id)
            
            if(existing){
                existing.price = curr.origin === 'cadastro' ? curr.price : existing.price
                existing.discountPercentage = Math.max(existing.discountPercentage, curr.discountPercentage)
                existing.origin = existing.discountPercentage > curr.discountPercentage ? existing.origin : curr.origin
                return acc
            }else{
                acc.push(curr)
            }

            return acc
        }, [] as Data[])

        
        return NextResponse.json({ data:precos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const {  id, price, discountPercentage } = await request.json()
        const { data:dataProdutos, error:errorProdutos } = await updatePrecoProduto({ id, price, discountPercentage })
        
        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }
       
        return NextResponse.json({ data:dataProdutos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}

