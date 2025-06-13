import { actionProcurarProdutos } from "@/actions/produtos/actionProcurarPorTag"
import ProdutoSecao from "@/components/Secoes/ProdutoSecao"
import { normalizarTexto } from "@/services/utils"


const Produtos = async ({ params }:{ params: Promise<{ termo: string }> }) => {
    const param = await params

    const termo = param?.termo || ""

    const texto = normalizarTexto(termo)

    if (!texto || texto.length < 2) {
        return <div className="p-4">Digite pelo menos 2 caracteres para buscar</div>
    }    

    const produtosFiltrados = await actionProcurarProdutos(texto)

    return (
        <div>
            <p className="my-4 text-xl">Buscando por: {texto}</p>
            <div className="grid grid-cols-4 gap-4">
                {
                    produtosFiltrados.map((p) => (
                        <ProdutoSecao key={p.id} produto={p} />
                    ))

                }
            </div>
        </div>

    )
}

export default Produtos