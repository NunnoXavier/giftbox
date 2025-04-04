import { Product } from "@/types/types"
import { ShoppingBag } from "lucide-react"

type ProdutoSecaoProps = {
    className?: string,
    produto?: Product,
}


const ProdutoSecao = ({ className, produto }: ProdutoSecaoProps) => {

    const Placeholder = () => {
        return(
            <div className={`${className} flex flex-col items-center w-48  md:w-96 shrink-0 snap-start justify-between py-4 text-center break-words border border-gray-200 rounded-md animate-pulse`}>
                <div className="">
                    <div className="w-40 h-48 md:h-92 md:w-92 bg-gray-200 rounded-md"></div>
                </div>
            
                <div className="bg-gray-300 w-28 md:w-48 h-2 rounded-2xl"></div>
                <div className="bg-gray-300 w-24 h-4 rounded-2xl"></div>
                <div className="bg-gray-200 w-32 h-6 rounded-2xl"></div>
            </div>
        )    
    }

    const PlaceholderImage = () => {
        return (
            <div className="relative min-h-48 md:min-h-92 w-48 md:w-92 rounded-md animate-pulse">
                <div className="absolute z-2 w-5 h-1 bg-gray-200 top-17 md:top-28 left-4/12 md:left-5/12 -translate-x-1/2 rounded-xs"></div>
                <div className="absolute z-5 w-12 h-12 bg-white top-7/12 md:top-5/12 left-1/2 -translate-1/2 rounded-full"></div>
                <div className="absolute z-6 w-10 h-10 bg-gray-200 top-7/12 md:top-5/12 left-1/2 -translate-1/2 rounded-full"></div>
                <div className="absolute w-28 h-18 bg-gray-200 top-7/12 md:top-5/12 left-1/2 -translate-1/2 rounded-md"></div>
            </div>            
        )
    }
    if(!produto){
        return <Placeholder />
    }
    
    return (
        <div className={`${className} flex flex-col items-center w-48  md:w-96 shrink-0 snap-start justify-between pb-4 text-center break-words border border-gray-200 rounded-md`}>
            <a href={`/produto/${produto.id}`}>
                <div className="min-h-48 md:min-h-92">                   
                    {
                        produto.thumbnail?
                        (
                            <img
                            className="w-48 md:w-96 rounded-t-md"
                                src={  produto.thumbnail } 
                                alt={`img: ${produto?.title}`}                   
                            />
                        ):
                        (
                            <PlaceholderImage />
                        )
                    }
                </div>
                
                <p className="text-sm md:text-lg text-gray-800">{produto?.title}</p>
                <p className="text-lg text-red-500" >R$ {produto?.price}</p>
            </a>
            <button 
                className="text-xs w-40 flex place-content-center bg-violet-400 text-white px-2 py-1 rounded-xl"
            >
                <ShoppingBag className="mr-2" size={15}/> 
                Adicionar à sacola
            </button>
        </div>
    )
}

export default ProdutoSecao