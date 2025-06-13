import { Product } from "@/types/types"
import ProdutoSecao from "./ProdutoSecao"

type SecaoProps = {
    className?: string,
    nomeSecao?: string,
    secao?: Product[],
}

const Secao = ({ className, nomeSecao, secao }:SecaoProps) => {
    if(secao?.length === 0){
        return
    }

    return (
        <div className={`${className}`}>
            <h3 className="text-texto text-center text-2xl font-bold my-3">{nomeSecao?.toLocaleUpperCase()}</h3>
            <div className="flex overflow-scroll gap-2 scroll-auto snap-x py-4 px-4">
                {
                    secao?.map((produto)=> {
                        return(
                            <ProdutoSecao key={produto.id} 
                                produto={produto}
                                className="bg-white border border-borda text-texto"
                            />
                        )
                        
                    })
                }
            </div>
        </div>
    )
}

export default Secao