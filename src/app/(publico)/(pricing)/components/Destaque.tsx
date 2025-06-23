import Banner from "./Banner"
import { Promocao } from "@/types/types"
import ProdutoSecao from "./ProdutoSecao/ProdutoSecao"

const Destaque = ({promocao}: {promocao: Promocao}) => {
    return (
        <div className="w-full h-full">
            <Banner src={promocao.banner}/>
            <div className="flex flex-wrap justify-between p-4 gap-4">{
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

export default Destaque