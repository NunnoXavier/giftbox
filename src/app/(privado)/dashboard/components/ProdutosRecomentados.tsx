import { actionProcurarProdutos } from "@/actions/produtos/actionProcurarPorTag"
import { fetchProdutosComprados } from "@/cachedFetchs/fetchProdutosComprados"
import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import ProdutoSecao from "@/components/Secoes/ProdutoSecao"

const ProdutosRecomendados = async () => {

    const produtosComprados = await fetchProdutosComprados(false)

    const  produtos = await fetchProdutos()
    
    const  meusProdutos = produtos
    .filter((produto) => (
        produtosComprados.some((produtoComprado) => produtoComprado?.idProduct === produto.id)
    ))

    const  minhasTags = meusProdutos
    .filter((produto) => produto.tags)
    .filter((produto) => produto.tags?.length! > 0 ? true : null)
    .map((produto) => produto.tags)
    .join(',')
    .replaceAll(' ', ',')
    
    const produtosRecomendados = (await actionProcurarProdutos(minhasTags))
    .filter((produto) => !meusProdutos.includes(produto))

    return (
        <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Para Sua Próxima Compra</h2>
            <div className="pr-2">
                <div className="flex flex-wrap gap-4">
                    {produtosRecomendados.map((produto) => (
                        <ProdutoSecao key={produto.id} produto={produto} 
                            className="col-span-1"
                            size="sm"
                        />
                    ))}
                </div>
            </div>
        </section>        
    )
}

export default ProdutosRecomendados