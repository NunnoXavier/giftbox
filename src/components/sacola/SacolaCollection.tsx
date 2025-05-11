import ProdutoSacola from "./ProdutoSacola"
import TotalSacola from "./TotalSacola"
import BtnEsvaziarSacola from "./BtnEsvaziarSacola"

const SacolaCollection = async () => {

    return (
        <div className="flex flex-col items-center mb-2">
            <h1 className="text-2xl font-bold text-center text-gray-600 mb-4">Sacola</h1>
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-20 gap-8 p-2 ">
                    <div className="bg-white col-span-1 md:col-span-12 border border-gray-200 overflow-scroll rounded-md">
                        <ProdutoSacola />
                    </div>            
                    <TotalSacola/>
                </div>
                <BtnEsvaziarSacola />
            </div>

        </div>
    )
}

export default SacolaCollection