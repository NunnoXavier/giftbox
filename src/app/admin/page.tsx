import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import CadastrarImagens from "@/components/admin/CadastrarImagens/CadastrarImagens"
import FormCadastrarProduto from "@/components/admin/CadastrarProduto/CadastrarProduto"
import GridProdutos from "@/components/admin/GridProdutos/GridProdutos"
import { Loader2 } from "lucide-react"
import { Suspense } from "react"

const Admin = async () => {
    const res = await fetchProdutos()
    const { data:produtos, error } = await res.json()
    
    return(
        <Suspense fallback={<Loader2 className="animate-spin"/>}>
            <div className="place-items-center">
                <h1 className="text-xl font-semibold m-4">Si Giftbox - Admin</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    <GridProdutos produtos={ produtos } />
                    <FormCadastrarProduto />
                    <CadastrarImagens />
                </div>
                <div className="h-20"></div> {/* rodapé */}
            </div>
        </Suspense>
    )
}

export default Admin