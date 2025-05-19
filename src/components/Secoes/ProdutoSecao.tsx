import { Product } from "@/types/types"
import BtnAddSacola from "../BtnAddSacola/BtnAddSacola"
import FlagPromo from "./FlagPromo"
import Image from "next/image"

type ProdutoSecaoProps = {
    className?: string,
    produto?: Product,
}

const ProdutoSecao = ({ className, produto }: ProdutoSecaoProps) => {
       
    const Placeholder = () => {
        return(
            <div className={`${className} flex flex-col items-center w-48  md:w-96 shrink-0 snap-start justify-between py-4 text-center break-words border border-borda rounded-md animate-pulse`}>
                <div className="">
                    <div className="w-40 h-48 md:h-92 md:w-92 bg-background rounded-md"></div>
                </div>
            
                <div className="bg-borda0 w-28 md:w-48 h-2 rounded-2xl"></div>
                <div className="bg-borda0 w-24 h-4 rounded-2xl"></div>
                <div className="bg-background w-32 h-6 rounded-2xl"></div>
            </div>
        )    
    }

    const PlaceholderImage = () => {
        return (
            <div className="relative min-h-48 md:min-h-92 w-48 md:w-92 rounded-md animate-pulse">
                <div className="absolute z-2 w-5 h-1 bg-background top-17 md:top-28 left-4/12 md:left-5/12 -translate-x-1/2 rounded-xs"></div>
                <div className="absolute z-5 w-12 h-12 bg-white top-7/12 md:top-5/12 left-1/2 -translate-1/2 rounded-full"></div>
                <div className="absolute z-6 w-10 h-10 bg-background top-7/12 md:top-5/12 left-1/2 -translate-1/2 rounded-full"></div>
                <div className="absolute w-28 h-18 bg-background top-7/12 md:top-5/12 left-1/2 -translate-1/2 rounded-md"></div>
            </div>            
        )
    }
    if(!produto){
        return <Placeholder />
    }
    
    const preco = produto.price? produto.price : 0
    const perc = produto.discountPercentage? produto.discountPercentage : 0
    const desc = (preco * (perc / 100))
    const promo = preco - desc 


    return (
        <div className={`${className} bg-white flex flex-col relative 
            items-center w-48  md:w-96 shrink-0 snap-start justify-between p-4 
            text-center break-words border border-borda rounded-md shadow-md`}>
            <FlagPromo perc={perc} visible={perc > 0} />
            <a href={`/produto/${produto.id}`}>
                <div className="min-h-48 md:min-h-92">                   
                    {
                        produto.thumbnail?
                        (
                            <Image
                            className="w-48 md:w-96 rounded-t-md"
                                src={  produto.thumbnail } 
                                alt={`img: ${produto?.title}`}
                                width={800} height={800}                   
                            />
                        ):
                        (
                            <PlaceholderImage />
                        )
                    }
                </div>
                
                <p className="text-sm md:text-lg text-texto">{produto?.title}</p>
                <p className={`${promo < preco? 'text-texto-label': 'text-transparent'} text-sm `} ><s>R$ {preco.toFixed(2)}</s></p>
                <p className={`${promo < preco? 'text-texto-alerta': 'text-texto'} text-lg`} >R$ {promo.toFixed(2)}</p>
            </a>
            <BtnAddSacola produto={produto} />
        </div>
    )
}

export default ProdutoSecao