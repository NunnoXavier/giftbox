import { Product } from "@/types/types"
import BtnAddSacola from "../BtnAddSacola/BtnAddSacola"
import FlagPromo from "./FlagPromo"
import Image from "next/image"
import { toCurrencyBr } from "@/services/utils"
import { fetchEstoqueProdutos, fetchPrecoProdutos } from "@/cachedFetchs/fetchsProdutos"

const sizeClasses:{sm:string, md:string,lg:string} = {
    sm: 'w-44 md:w-48 h-62 md:h-76', 
    md: 'w-52 md:w-72 h-82 md:h-110', 
    lg: 'w-56 md:w-80 h-92 md:h-140'
}

type ProdutoSecaoProps = {
    className?: string,
    produto?: Product,
    size?: 'sm' | 'md' | 'lg'
}

const ProdutoSecao = async ({ className, produto, size='lg' }: ProdutoSecaoProps) => {
    const dataPrecos = await fetchPrecoProdutos()
    const dataEstoque = await fetchEstoqueProdutos()
    
    const classSize = sizeClasses[size || 'lg']

    if(!produto){
        return
    }
    
    const estoque = dataEstoque?.find((estoque) => estoque.id === produto?.id)?.stock 
    || produto.stock!
    
    const precos = dataPrecos?.find((preco) => preco.id === produto?.id)

    const preco = precos? 
        (precos.price? precos.price : 0)
    :   (produto.price? produto.price : 0)
    

    const perc = precos?
        (precos.discountPercentage? precos.discountPercentage : 0)
    :   (produto.discountPercentage? produto.discountPercentage : 0)
    const desc = (preco * (perc / 100))
    const promo = preco - desc 

    if(estoque <= 0){
        return
    }

    return (
        <div className={`${className} flex flex-col relative 
            ${ classSize }
            items-center shrink-0 snap-start justify-between p-4 
            text-center break-words rounded-md shadow-md`}>
            <FlagPromo perc={perc} visible={perc > 0} />
            <a href={`/produto/${produto.id}`} className="relative w-full h-1/2">
                    {
                        <Image
                        className="object-cover rounded-md"
                            src={  produto.thumbnail || '/images/placeholder.jpeg'} 
                            alt={`img: ${produto?.title}`}
                            fill
                        />
                    }
                </a>
                
                <p className={`font-bold ${size === 'lg'? 'text-lg': 'text-md'}`}>{produto?.title}</p>
                <div className={`${estoque > 0? 'block' : 'hidden'}`}>
                    <p className={`${promo < preco? '': 'text-transparent'} text-sm `} ><s>{toCurrencyBr(preco)}</s></p>
                    <p className={`${promo < preco? 'text-texto-alerta': ''} 
                    ${size === 'lg'?'text-lg': 'text-md'}`} >{toCurrencyBr(promo)}</p>
                </div>
            <BtnAddSacola produto={produto} />
        </div>
    )
}

export default ProdutoSecao