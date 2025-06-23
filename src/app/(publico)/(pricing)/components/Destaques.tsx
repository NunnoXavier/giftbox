import { fetchPromocoes } from "@/cachedFetchs/fetchPromocoes"
import { dateToISO } from "@/services/utils"
import Destaque from "./Destaque"

const Destaques = async() => {

    const promocoes = await fetchPromocoes()
   
    if(!promocoes) return 

    const produtosEmDestaque = promocoes.filter((promocao) => (
        new Date(dateToISO(promocao.createdAt)) <= new Date() &&
        new Date(dateToISO(promocao.finalDate)) >= new Date()
    ))

    return (
        <div className="w-full">
            {
                produtosEmDestaque.map((promocao) => (
                    <Destaque key={promocao.id} promocao={promocao}/>
                ))
            }
        </div>
    )
}

export default Destaques