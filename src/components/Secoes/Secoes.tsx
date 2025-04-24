import { Category, Product } from "@/types/types"
import Secao from "./Secao"
import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import { fetchSecoes } from "@/cachedFetchs/fetchsSecoes"

type SecoesProps = {
    className?: string,
}

const Secoes = async ({ className }: SecoesProps) => {
    const umaHora = 3600
    const res = await fetchSecoes()
    const { data:dataCategorias, error:errorCategorias }:{ data:Category[], error: string } = await res.json()
    if(!dataCategorias){
        console.log(errorCategorias)
        return ( <>Erro ao carregar dados tente mais tarde</> )
    }
    
    const listaSecoes:string[] = dataCategorias.map((s)=> s.description)
    const res2 = await fetchProdutos()
    const { data:dataProdutos, error:errorProdutos }:{data:Product[], error: string} = await res2.json()
    if(!dataProdutos){
        console.log(errorProdutos)
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