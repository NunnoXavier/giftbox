import { Product, ProductCart } from "@/types/types"
import { Truck } from 'lucide-react'
import ImagemProduto from "./ImagemProduto"
import AvaliarProduto from "./AvaliarProduto" 
import AdicionarSacola from "./AdicionarSacola"

type ProdutoProps = {
    className?: string,
    id?: string,
}

const Produto = async ( { className, id }: ProdutoProps ) => {
    const umaHora = 3600
    // const res = await fetch(`http://localhost:3000/api/produtos/${id}`, { next: {revalidate: umaHora } })
    const res = await fetch(`http://localhost:3000/api/produtos/${id}`, { cache: "no-cache" })
    const { data:produto, error  }:{data:Product, error:string } = await res.json()
    if(!produto){
        console.log(error)
        return <>Erro ao obter dados do produto</>
    }
    const imagens = produto.images

    const itemSacola:ProductCart = {
        id: 0,
        idProduct: produto?.id || 0,
        qtde: 1,
    }

    return (
        <div className={`${className} `}>            
            <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="col-start-1 md:col-start-2 col-span-1 md:col-span-5">
                    <ImagemProduto  imagens={imagens}/>
                </div>
                <div className="col-start-1 md:col-start-8 col-span-1 md:col-span-4  flex  flex-col justify-center space-y-5 border border-gray-200 rounded-lg p-4">
                    <h1 className="text-2xl text-center">{produto.title}</h1>
                    <div className="flex justify-evenly text-sm text-gray-500">
                        <span>ID: {produto.id}</span> 
                        <span>REF.: {produto.sku}</span>                                          
                    </div>
                    <AvaliarProduto rating={produto.rating}/>
                    <div className="text-center" >
                        <span>{produto.stock} unidade em estoque</span>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl text-rose-500">R${produto.price?.toFixed(2)}</h1>
                    </div>
                    <AdicionarSacola itemSacola={ itemSacola } />
                    <div className="flex flex-col gap-2 place-items-center">
                        <span className="flex gap-2"> <Truck /> Calcular Frete e prazo</span>  
                        <div className="flex bg-gray-100 pl-2 text-center focus:border focus:border-violet-400 rounded-xl">
                            <input className="outline-0 appearance-none caret-violet-400 text-violet-400  w-36" type="text" 
                                placeholder="digite o seu cep"
                            />
                            <button className="flex-1 flex gap-2 justify-center place-items-center bg-violet-400 text-white px-5 rounded-xl">Calcular</button>
                        </div>  
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Produto