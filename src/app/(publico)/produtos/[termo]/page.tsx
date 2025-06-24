import { actionProcurarProdutos } from "@/actions/produtos/actionProcurarPorTag"
import ProdutoSecao from "@/app/(publico)/(pricing)/components/ProdutoSecao/ProdutoSecao"
import { normalizarTexto } from "@/services/utils"


const Produtos = async ({ params }:{ params: Promise<{ termo: string }> }) => {
    const termo = (await params).termo
    const texto = normalizarTexto(termo)

    if (!texto || texto.length < 2) {
        return <div className="p-4">Digite pelo menos 2 caracteres para buscar</div>
    }    

    const produtosFiltrados = await actionProcurarProdutos(texto)

    return (
        <div>
            <p className="my-4 text-xl">Buscando por: {texto}</p>
            <div className="flex gap-4">
                {
                    produtosFiltrados.map((p) => (
                        <ProdutoSecao key={p.id} produto={p} 
                        className="bg-gradient-to-tr from-40% from-white to-violet-200"
                        />
                    ))

                }
            </div>
        </div>

    )
}

export default Produtos