'use client'
import { createQuerySacola } from "../Store/SacolaStore"
import BtnPagamento from "./BtnPagamento"

const TotalSacola = () => {
    
    const { data:itens, isLoading, isError, error } = createQuerySacola()
    
    if (isLoading) return <div>Carregando sacola...</div>
    if (isError) return <div>Erro Sacola: {error.message}</div>
    
    if(!itens){
        return
    }


    const total = itens.reduce((prev,p) => {
        const preco = p?.price? p.price : 0
        return prev + (preco * p.qtde)

    },0)
    const custoEntrega = 0
    const desc = itens.reduce((prev,p) => { 
        const preco = p?.price? p.price : 0
        const perc = p?.discountPercentage? p.discountPercentage : 0
        const desc = (preco * (perc / 100)) * p.qtde
        return prev + desc
    },0)

    return (
        <div className="bg-white flex flex-col justify-between border border-gray-200 h-70 col-span-1 md:col-span-8 rounded-md text-sm p-2 text-center">
            <h1 className="font-bold text-lg text-gray-600">Resumo dos Valores</h1>
            <div className="flex gap-2 border-b  justify-end border-b-gray-200 p-2">
                <h1>Valor Produtos:</h1>
                <span>{total.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 border-b  justify-end border-b-gray-200 p-2">
                <h1>Valor Entrega:</h1>
                <span>{custoEntrega.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 border-b  justify-end border-b-gray-200 p-2 text-violet-800">
                <h1>Desconto:</h1>
                <span>-{desc.toFixed(2)}</span>
            </div>
            <div className="flex gap-2 font-bold justify-end  p-2">
                <h1>Total:</h1>
                <span>{(total - desc).toFixed(2)}</span>
            </div>

            <BtnPagamento enabled={itens.length > 0}/>
        </div>               
    )
}

export default TotalSacola