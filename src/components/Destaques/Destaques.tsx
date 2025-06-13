import { fetchPromocoes } from "@/cachedFetchs/fetchPromocoes"
import Banner from "../Banner/Banner"
import { Promocao } from "@/types/types"
import { dateToISO } from "@/services/utils"
import ProdutoSecao from "../Secoes/ProdutoSecao"






const Destaque = ({promocao}: {promocao: Promocao}) => {
    return (
        <div className="w-full h-full">
            <Banner src={promocao.banner}/>
            <div className="flex flex-wrap justify-between p-4 gap-4">
                {
                    promocao.products?.map((product) => (
                        <div key={product.id}>
                            <ProdutoSecao produto={product}
                                className="bg-gradient-to-tr from-40% from-violet-800 to-pink-600 text-white"
                            />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

const Destaques = async() => {

    const promocoes = await fetchPromocoes()
   
    if(!promocoes) return null

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