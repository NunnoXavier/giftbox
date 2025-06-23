import { fetchEstoqueProdutos, fetchPrecoProdutos } from "@/cachedFetchs/fetchsProdutos"
import { Product } from "@/types/types"

export const classesBase = "flex flex-col relative items-center shrink-0 snap-start justify-between p-4 text-center break-words rounded-md shadow-md"

const sizeClasses:{sm:string, md:string,lg:string} = {
    sm: 'w-44 md:w-48 h-62 md:h-76', 
    md: 'w-52 md:w-72 h-82 md:h-110', 
    lg: 'w-56 md:w-80 h-92 md:h-140'
}

export type TSize = 'sm' | 'md' | 'lg'

const hooks = async (produto: Product) => {
    const dataPrecos = await fetchPrecoProdutos()
    const dataEstoque = await fetchEstoqueProdutos()

    const classSize = (size:TSize ) => sizeClasses[size || 'lg']
    const titleSize = (size:TSize) => size === 'lg'? 'text-lg': 'text-md'
    
    const estoque = dataEstoque.find((estoque) => estoque.id === produto?.id)?.stock 
    || produto.stock || 0
    
    const precos = dataPrecos?.find((preco) => preco.id === produto?.id)

    const preco = precos? 
        (precos.price? precos.price : 0)
    :   (produto.price? produto.price : 0)

    const perc = precos?
        (precos.discountPercentage? precos.discountPercentage : 0)
    :   (produto.discountPercentage? produto.discountPercentage : 0)
    
    const desc = (preco * (perc / 100))
    const promo = preco - desc
    const emPromocao = promo < preco
    const emEstoque = estoque > 0

    return {
        estoque,
        preco,
        perc,
        promo,
        desc,
        classSize,
        titleSize,
        emPromocao,
        emEstoque
    }
}

export default hooks