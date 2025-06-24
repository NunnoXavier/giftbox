import AdicionarSacola from "@/components/Produto/AdicionarSacola"
import AvaliacaoProduto from "./components/AvaliacaoProduto"
import ImagemProduto from "@/components/Produto/ImagemProduto/ImagemProduto"
import CalcFrete from "@/components/Produto/CalcFrete"
import Reviews from "./components/Reviews"
import { hookProduto } from "./hooks/hookProduto"
import Estoque from "./components/Estoque"
import Precos from "./components/Precos"
import Especificacoes from "./components/Especificacoes"

const Produto = async ({ params }:{ params: Promise<{ id:string }> }) => {
    const { id } = await params    

    if(!id){
        return <h1>Produto não encontrado</h1>
    }

    const data = await hookProduto(id)

    if(!data.produto){
        return
    }

    return (
        <div>            
            <div className="grid grid-cols-1 md:grid-cols-12 px-4">
                {/* imagem */}
                <div className=" col-start-1 md:col-start-2 col-span-1 md:col-span-5">
                    <ImagemProduto  imagens={data.imagens}/>
                </div>
                {/* dados do produto */}
                <div 
                className="bg-white col-start-1 md:col-start-8 col-span-1 md:col-span-4  
                flex  flex-col justify-center space-y-5 border border-borda 
                rounded-lg p-4 shadow-md"
                >
                    <h1 className="text-2xl text-center">{data.produto.title}</h1>
                    <div className="flex justify-evenly text-sm text-texto-label">
                        <span>ID: {data.produto.id}</span> 
                        <span>REF.: {data.produto.sku}</span>                                          
                    </div>
                    <AvaliacaoProduto className="place-items-center" rating={data.produto.rating}/>
                    <Estoque estoque={data.estoque}/>
                    <Precos promo={data.promo} preco={data.preco} visivel={data.estoque > 0}/>
                    <AdicionarSacola itemSacola={ data.itemSacola } className={`${data.estoque > 0? 'block' : 'hidden'}`} />
                    <CalcFrete dimensoes={data.produto.dimensions!} peso={data.produto.weight!} />
                </div>
            </div>
            <Especificacoes produto={data.produto}/>

            <div className="flex flex-col gap-8 col-start-1 md:col-start-2 col-span-1 md:col-span-12 p-4 mt-20">
                <h1 className="text-2xl text-center">AVALIAÇÕES</h1>
                <Reviews idProduto={data.produto.id}/>
            </div>
        </div>
    )
}

export default Produto