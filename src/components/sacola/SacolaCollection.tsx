import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import ProdutoSacola from "./ProdutoSacola"
import TotalSacola from "./TotalSacola"
import { Product } from "@/types/types"
import BtnEsvaziarSacola from "./BtnEsvaziarSacola"

const SacolaCollection = async () => {

    const res = await fetchProdutos()
    const { data, error } = await res.json()

    if(!data){
        console.log(error)
        return (<>Erro ao Carregar Produtos</>)
    }

    const produtos: Product[] = data

    return (
        <div className="h-dvh flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-gray-600 mb-4">Sacola</h1>
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-20 gap-8 p-2 ">
                    <div className="bg-white col-span-1 md:col-span-12 border border-gray-200 overflow-scroll rounded-md">
                        <ProdutoSacola produtos={ produtos } />
                    </div>            
                    <TotalSacola produtos={ produtos }/>
                </div>
                <BtnEsvaziarSacola />
            </div>

        </div>
    )
}

export default SacolaCollection