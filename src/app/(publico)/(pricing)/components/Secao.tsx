import { Product } from "@/types/types"
import ProdutoSecao from "./ProdutoSecao/ProdutoSecao"
import Carrossel from "@/components/genericos/Carrossel/Carrossel"

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
            <h3 className="text-texto text-center text-2xl font-bold my-3"
            >
                {nomeSecao?.toLocaleUpperCase()}
            </h3>
            <Carrossel>{
                secao?.map((produto)=> (
                    <ProdutoSecao key={produto.id} 
                        produto={produto}
                        size="md"
                        className="bg-white border border-borda text-texto"
                    />
                ))
            }
            </Carrossel>
        </div>
    )
}

export default Secao