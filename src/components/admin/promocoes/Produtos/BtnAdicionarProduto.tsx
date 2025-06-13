'use client'

import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import InputCurrency from "@/components/genericos/Inputs/InputCurrency"
import InputNumber from "@/components/genericos/Inputs/InputNumber"
import { toCurrencyBr } from "@/services/utils"
import { Product } from "@/types/types"
import { useEffect, useState } from "react"

type BtnProps = {
    item: Product
    index: number
    onChange: (item: Product, index: number) => {newId: number, newDiscountPercentage: number} | undefined
}

const BtnAdicionarProduto = ({item, index, onChange}: BtnProps) => {
    const [id, setId] = useState(item.id?.toString() || '0')
    const [desconto, setDesconto] = useState(item.discountPercentage?.toString().replace(".",",") || '0')
    const [produtos, setProdutos] = useState<Product[]>([])
    const produto = produtos.find((p) => p.id === Number(id))
    
    useEffect(() => {
        fetchProdutos()
        .then((p) => setProdutos(p))
    },[])

    const handleBlur = () => {
        const change = onChange({
            ...produto,
            discountPercentage: Number(desconto.replace(',', '.'))
        }, index)

        if(change){
            setId(change.newId.toString())
            setDesconto(change.newDiscountPercentage?.toString()?.replace('.',','))
        }
    }

    const preco = produto?.price || 0
    const precoDesconto = preco * (1 - Number(desconto.replace(',', '.')) / 100)
    const precoFinal = toCurrencyBr(precoDesconto)

    return (
        <div className="flex items-center w-full gap-2 text-sm">
            <div className="flex flex-col  justify-center gap-2">
                <div className="flex items-center gap-2">
                    <label htmlFor="id" className="w-12">ID:</label>
                    <InputNumber 
                        className="w-15 text-right px-2"
                        name="id" value={id} 
                        onChange={(value) => { setId(value) }}
                        placeHolder="ID Produto"
                        onBlur={ handleBlur }
                    />
                    <span className="w-46 md:w-120 text-xs text-texto-label whitespace-nowrap overflow-hidden">
                        {produto?.title?.toUpperCase() || ""}
                    </span>
                </div>
                <div className="flex items-center gap-2 ">
                    <label htmlFor="desconto" className="w-12">Descto:</label>
                    <InputCurrency
                        className="w-15 text-right px-2"
                        name="desconto" value={desconto} 
                        onChange={(value) => { setDesconto(value) }}
                        placeHolder="Preço"
                        onBlur={ handleBlur }
                    />
                    <span className="w-46 md:w-120 text-texto-label ">{`Preço Final: ${precoFinal}`}</span>
                </div>
            </div>
        </div>
    )
}

export default BtnAdicionarProduto