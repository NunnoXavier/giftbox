import { Category, Product } from "@/types/types"
import Secao from "./Secao"
import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import { fetchSecoes } from "@/cachedFetchs/fetchsSecoes"

type SecoesProps = {
    className?: string,
}

const Secoes = async ({ className }: SecoesProps) => {
    const dataCategorias = await fetchSecoes()

    if(!dataCategorias){
        return ( <>Erro ao carregar dados tente mais tarde</> )
    }
    
    const listaSecoes:string[] = dataCategorias.map((s) => s.description)
    const dataProdutos = await fetchProdutos()
    
    if(!dataProdutos){
        return ( <>Erro ao carregar dados tente mais tarde</> )
    }

    return (
        <div className={`${className}`}>
            <ul>
                {
                    listaSecoes?.map((nomeSecao, index) => {
                        const secao = dataProdutos?.filter((produto) => produto.category?.description === nomeSecao)
                        return (
                            <Secao key={index} nomeSecao={nomeSecao} secao={secao}/>
                        )
                    })
                }
            </ul>
        </div>
    )

}

export default Secoes