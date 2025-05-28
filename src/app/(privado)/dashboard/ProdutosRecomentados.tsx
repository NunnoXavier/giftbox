import { actionProcurarProdutos } from "@/actions/produtos/actionProcurarPorTag"
import { fetchProdutosComprados } from "@/cachedFetchs/fetchProdutosComprados"
import { fetchPrecoProdutos, fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import { toCurrencyBr } from "@/services/utils"
import Image from "next/image"

const ProdutosRecomendados = async () => {

    const produtosComprados = await fetchProdutosComprados(true)

    const  produtos = await fetchProdutos()
    const precos = await fetchPrecoProdutos()
    
    const  meusProdutos = produtos
    .filter((produto) => (
        produtosComprados.some((produtoComprado) => produtoComprado?.idProduct === produto.id)
    ))

    const  minhasTags = meusProdutos
    .filter((produto) => produto.tags)
    .filter((produto) => produto.tags?.length! > 0 ? true : null)
    .map((produto) => produto.tags)
    .flat()
    .join(',')
    .replaceAll(' ', ',')
    
    const produtosRecomendados = (await actionProcurarProdutos(minhasTags))
    .filter((produto) => !meusProdutos.includes(produto))

    return (
        <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Para Sua Próxima Compra</h2>
            <div className="max-h-[28rem] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {produtosRecomendados.map((produto) => {
                    const valores = precos.find((preco) => preco.id === produto.id)
                    const preco = valores?.price || 0
                    const desconto = valores?.discountPercentage || 0
                    const precoComDesconto = preco - (preco * desconto / 100)

                    return (
                        <div key={produto.id} className="flex flex-col items-center border border-borda rounded-lg p-3 hover:shadow transition">
                            <Image
                            width={200}
                            height={200}
                            src={produto.thumbnail ?? "/images/placeholder.jpeg"}
                            alt={produto.title ?? "Produto"}
                            className="w-full h-32 object-cover rounded mb-2"
                            />
                            <h3 className="text-sm text-center font-medium text-text h-10 overflow-clip">{produto.title}</h3>
                            <p className="text-xs text-texto-label">{produto.category?.description}</p>
                            <div className="text-center mt-auto">
                                <p className={`${desconto > 0?'text-texto-label':'text-transparent'} 
                                     text-xs font-bold mt-1`}
                                     
                                >
                                    <s>{toCurrencyBr(preco)}</s>
                                </p>
                                <p className="text-sm font-bold text-texto2 mt-1">{toCurrencyBr(precoComDesconto)}</p>

                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </section>        
    )
}

export default ProdutosRecomendados