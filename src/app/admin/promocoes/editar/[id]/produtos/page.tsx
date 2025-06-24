import { actionInserirProdutosPromocao } from "@/actions/admin/promocoes/actionInserirProdutosPromocao"
import Produtos from "@/components/admin/promocoes/Produtos/Produtos"
import { Product } from "@/types/types"
import { fetchPromocao } from "@/serverCache/fetchPromocoes"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

const PageProdutos = async ({ params }: { params: Promise<{ id: string }> }) => {
    const {id} = await params
    const promocao = await fetchPromocao(Number(id))

    if(!promocao){
        return <div>Promoção não encontrada</div>
    } 

    const salvar = async (produtos: Product[]) => {
        'use server'

        try {
            const response = await actionInserirProdutosPromocao({ ...promocao, products: produtos })
    
            if(!response){
                alert("ocorreu um erro ao salvar a promoção, tente novamente mais tarde")
                return false
            }
    
            revalidateTag('promocoes')    

            return true
        } catch (error: any) {
            return false
        }finally{
            redirect(`/admin/promocoes/`)            
        }

    }


    return (
        <div className="w-full min-h-dvh flex flex-col items-center gap-5 p-5">
            <Produtos initialData={promocao?.products} action={salvar}/>
        </div>
    )
}

export default PageProdutos

function actionProdutosPromocao(arg0: { products: Product[]; id?: number; title: string; banner: string; createdAt: Date; finalDate: Date }) {
    throw new Error("Function not implemented.")
}
