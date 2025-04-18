import ProdutoSacola from "./ProdutoSacola"
import TotalSacola from "./TotalSacola"

const SacolaCollection = () => {

    return (
        <div className="h-dvh flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-gray-600 mb-4">Sacola</h1>

            <div className="grid grid-cols-1 md:grid-cols-20 gap-8 max-w-300 h-14/20 p-2">
                <div className="col-span-1 md:col-span-12 border border-gray-200 overflow-scroll rounded-md">
                    <ProdutoSacola />
                </div>            
                <TotalSacola />
            </div>


        </div>
    )
}

export default SacolaCollection