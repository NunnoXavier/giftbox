import { Product, ProductCart } from "@/types/types"
import ImagemProduto from "./ImagemProduto"
import AvaliacaoProduto from "./AvaliacaoProduto" 
import AdicionarSacola from "./AdicionarSacola"
import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import { toCurrencyBr, toDateBr } from "@/services/utils"
import CalcFrete from "./CalcFrete"

type ProdutoProps = {
    className?: string,
    id?: string,
}

const Produto = async ( { className, id }: ProdutoProps ) => {
    const produtos = await fetchProdutos()

    const produto = produtos.find((p) => p.id === Number(id))

    if(!produto){
        return
    }

    const imagens = produto.images

    const itemSacola:ProductCart = {
        id: 0,
        title: produto.title || "",
        idProduct: produto.id || 0,
        qtde: 1,
        price: produto.price,
        discountPercentage: produto.discountPercentage,
        thumbnail: produto.thumbnail
    }

    const preco = produto.price? produto.price : 0
    const perc = produto.discountPercentage? produto.discountPercentage : 0
    const desc = (preco * (perc / 100))
    const promo = preco - desc 

    return (
        <div className={`${className} `}>            
            <div className="grid grid-cols-1 md:grid-cols-12">
                {/* imagem */}
                <div className=" col-start-1 md:col-start-2 col-span-1 md:col-span-5">
                    <ImagemProduto  imagens={imagens}/>
                </div>
                {/* dados do produto */}
                <div 
                className="bg-white col-start-1 md:col-start-8 col-span-1 md:col-span-4  
                flex  flex-col justify-center space-y-5 border border-borda rounded-lg p-4 shadow-md"
                >
                    <h1 className="text-2xl text-center">{produto.title}</h1>
                    <div className="flex justify-evenly text-sm text-texto-label">
                        <span>ID: {produto.id}</span> 
                        <span>REF.: {produto.sku}</span>                                          
                    </div>
                    <AvaliacaoProduto rating={produto.rating}/>
                    <div className="text-center" >
                        <span>{produto.stock} unidade em estoque</span>
                    </div>
                    <div className="text-center">
                        <h1 
                            className={`${promo < preco? 'text-texto-label': 'text-transparent'} 
                            text-sm `} 
                        >
                            <s>{toCurrencyBr(preco)}</s>
                        </h1>
                        <h1 
                            className={`${promo < preco? 'text-texto-alerta': 'text-texto'} 
                            text-3xl`} 
                        >
                            {toCurrencyBr(promo)}
                        </h1>
                    </div>
                    <AdicionarSacola itemSacola={ itemSacola } />
                    <CalcFrete />
                </div>
                {/* descricao */}
                <div 
                    className="flex flex-col gap-8 col-start-1 md:col-start-2 col-span-1 
                    md:col-span-12 p-4 mt-20"
                >
                    <h1 className="text-2xl text-center">DESCRIÇÃO</h1>
                    <p className="text-justify whitespace-break-spaces">{produto.description}</p>
                    
                        <div className="flex gap-2">
                            <b className="w-40">Tags:</b> 
                            <span className="flex-1">{produto.tags || ""} </span>
                        </div>
                    
                    <h1 className="text-2xl text-center">ESPECIFICAÇÕES</h1>
                    <ul className="list-image-none list-inside">
                        <li className="flex gap-2">
                            <b className="w-40">Marca:</b> 
                            <span className="flex-1">{produto.brand}</span>
                        </li>
                        <li className="flex gap-2">
                            <b className="w-40">Categoria:</b>
                            <span className="flex-1">{produto.category?.description}</span>
                        </li>
                        <li className="flex gap-2">
                            <b className="w-40">Data de cadastro:</b>
                            <span className="flex-1">{toDateBr(produto.meta?.createdAt)}</span>
                        </li>
                        <li className="flex gap-2">
                            <b className="w-40">Última atualização:</b>
                            <span className="flex-1">{toDateBr(produto.meta?.updatedAt)}</span>
                        </li>
                    </ul>
                    <h1 className="text-2xl text-center">DIMENSÕES</h1>
                    <ul className="list-image-none list-inside">
                        <li className="flex gap-2">
                            <b className="w-40">Peso:</b>
                            <span className="flex-1">{produto.weight} kg</span>
                        </li>
                        <li className="flex gap-2">
                            <b className="w-40">Altura:</b>
                            <span className="flex-1">{produto.dimensions?.height} cm</span>
                        </li>
                        <li className="flex gap-2">
                            <b className="w-40">Largura:</b>
                            <span className="flex-1">{produto.dimensions?.width} cm</span>
                        </li>
                        <li className="flex gap-2">
                            <b className="w-40">Profundidade:</b>
                            <span className="flex-1">{produto.dimensions?.depth} cm</span>
                        </li>
                    </ul>   

                    <h1 className="text-2xl text-center">POLÍTICAS DE DEVOLUÇÃO</h1>
                    <p className="text-justify">{produto.returnPolicy || ""}</p>

                    <h1 className="text-2xl text-center">INFORMAÇÕES DE ENVIO</h1>
                    <p className="text-justify">{produto.shippingInformation || ""}</p>
                </div>

            </div>

        </div>



    )
}

export default Produto