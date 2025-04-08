import CadastrarImagens from "@/components/admin/CadastrarImagens/CadastrarImagens"
import CadastrarProduto from "@/components/admin/CadastrarProduto/CadastrarProduto"
import GridProdutos from "@/components/admin/GridProdutos/GridProdutos"
import { Category, Product } from "@/types/types"

const Admin = async () => {
    const res = await fetch('http://localhost:3000/api/secoes', {cache: 'no-cache'})
    
    const res2 = await fetch('http://localhost:3000/api/produtos', {cache: 'no-cache'})
    const { data:categorias, error }:{ data:Category[], error:null } = await res.json()
    if(!categorias){
        console.log(error)
        return (<>erro ao carregar categorias</>)
    }
    
    const { data:produtos, error:errorPro }:{ data:Product[], error:null }  = await res2.json()
    if(!produtos){
        console.log(errorPro)
        return (<>erro ao carregar produtos</>)
    }
    
    
    return(
        <div className="place-items-center">
            <h1 className="text-xl font-semibold m-4">Si Giftbox - Admin</h1>
            <div className="flex flex-col md:flex-row gap-4">
                <GridProdutos produtos={produtos}/>
                <CadastrarProduto produtos={produtos} categorias={categorias}/>
                <CadastrarImagens produtos={produtos}/>
            </div>
            <div className="h-20"></div> {/* rodapé */}
        </div>
    )
}

export default Admin