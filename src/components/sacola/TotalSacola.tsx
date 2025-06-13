'use client'
import { toCurrencyBr } from "@/services/utils"
import { createQuerySacola } from "../../../Store/SacolaStore"
import BtnPagamento from "./BtnPagamento"
import { useEffect, useState } from "react"
import { fetchPrecoProdutos } from "@/cachedFetchs/fetchsProdutos"

type Precos = {
    id: number,
    price: number,
    discountPercentage: number,
}

const TotalSacola = () => {
    
    const { data:itens, isLoading, isError, error } = createQuerySacola()

    const [ precos, setPrecos] = useState<Precos[]>([])

    useEffect(() => {
        fetchPrecoProdutos()
        .then((data) => {
            setPrecos(data)
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])
    
    if (isLoading) return <div>Carregando sacola...</div>
    if (isError) return <div>Erro Sacola: {error.message}</div>
    
    if(!itens){
        return
    }


    const total = itens.reduce((prev,p) => {
        const valores = precos.find(v => v.id === p.idProduct)
        const preco = valores?.price? valores.price 
            : p.price? p.price : 0
        return prev + (preco * p.qtde)

    },0)
    const custoEntrega = 0
    const desc = itens.reduce((prev,p) => { 
        const valores = precos.find(v => v.id === p.idProduct)
        const preco = valores?.price? valores.price 
            : p.price? p.price : 0
        const perc = valores?.discountPercentage? valores.discountPercentage 
            : p.discountPercentage? p.discountPercentage : 0
        const desc = (preco * (perc / 100)) * p.qtde
        return prev + desc
    },0)

    return (
        <div className="bg-white flex flex-col justify-between border border-borda h-70 col-span-1 md:col-span-8 rounded-md text-sm p-2 text-center shadow-md">
            <h1 className="font-bold text-lg text-texto">Resumo dos Valores</h1>
            <div className="flex gap-2 border-b  justify-end border-borda p-2">
                <h1>Valor Produtos:</h1>
                <span>{toCurrencyBr(total)}</span>
            </div>
            <div className="flex gap-2 border-b  justify-end border-borda p-2">
                <h1>Valor Entrega:</h1>
                <span>{toCurrencyBr(custoEntrega)}</span>
            </div>
            <div className="flex gap-2 border-b  justify-end border-borda p-2 text-texto2">
                <h1>Desconto:</h1>
                <span>-{toCurrencyBr(desc)}</span>
            </div>
            <div className="flex gap-2 font-bold justify-end  p-2">
                <h1>Total:</h1>
                <span>{toCurrencyBr(total - desc)}</span>
            </div>

            <BtnPagamento enabled={itens.length > 0}/>
        </div>               
    )
}

export default TotalSacola