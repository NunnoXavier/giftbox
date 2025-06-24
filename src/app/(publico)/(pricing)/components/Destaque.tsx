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
                            className="bg-gradient-to-tr from-40% from-white to-violet-200
                                border border-borda"
                        />
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Destaque