import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import ProdutoSecao from "@/components/Secoes/ProdutoSecao"
import { normalizarTexto } from "@/services/utils"
import { Product } from "@/types/types"
import Fuse from "fuse.js"

const Produtos = async ({ params }:{ params: Promise<{ termo: string }> }) => {
    const { termo } = await params

    const texto = normalizarTexto(termo)

    if(!texto){
        return <></>
    }

    const res = await fetchProdutos()

    const { data:produtos, error }:{ data:Product[], error:string } = await res.json()
    if(!produtos){
        console.log(error)
        return <></>
    }

    const fuse = new Fuse<Product>(produtos, {
        keys: ['title', 'tags'],
        threshold: 0.4,
        distance: 100,
        ignoreLocation: true,
        includeScore: true,        
    });

    const resultado = fuse.search(texto)
    const produtosFiltrados = resultado.map((result) => result.item)
    console.log(resultado)


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