'use client'
import { ProductCart } from "@/types/types"
import { createQuerySacola } from "../Store/SacolaStore"
import { createQueryProdutos } from "../Store/ProdutoStore"

interface ProdutoSacola extends ProductCart {
    price: number,
    discountPercentage: number    
}

const TotalSacola = () => {
    const { data:produtos, isLoading:isLoadingProdutos, isError:isErrorProdutos, error:errorProdutos } = createQueryProdutos()
    const { data:itens, isLoading, isError, error } = createQuerySacola()
    
    if (isLoading) return <div>Carregando sacola...</div>
    if (isError) return <div>Erro Sacola: {error.message}</div>
    
    if(!itens){
        return
    }
    
    
    if (isLoadingProdutos) return <div>Carregando produtos...</div>
    if (isErrorProdutos) return <div>Erro Produtos: {errorProdutos.message}</div>
    
    if(!produtos){
        return
    }

    const produtosSacola:ProdutoSacola[] = itens.map((i) => {
        const pro = produtos.find((p) => p.id === i.idProduct)

        return {
            id: i.id,
            idProduct: i.idProduct,
            qtde: i.qtde,
            price: pro?.price || 0,
            discountPercentage: pro?.discountPercentage || 0
        }
    })

    const total = produtosSacola.reduce((prev,p) => prev + p.qtde * p.price ,0)
    const custoEntrega = 0
    const desc = produtosSacola.reduce((prev,p) => prev + p.qtde * p.price * (p.discountPercentage /100) ,0)

    return (
        <div className="col-span-1 md:col-span-8 rounded-md text-sm p-2 text-center">
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
        </div>               
    )
}

export default TotalSacola