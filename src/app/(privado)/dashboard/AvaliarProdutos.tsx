import BtnAvaliar from '@/components/BtnAvaliar/BtnAvaliar'
import { fetchProdutosAvaliar } from '@/cachedFetchs/fetchProdutosAvaliar'
import Image from "next/image"

const AvaliarProdutoss = async () => {

    const itens = await fetchProdutosAvaliar()
    
    if(!itens){
        return (
            <h1>Ocorreu um erro ao buscar os pedidos. Tente mais tarde!</h1>
        )
    }

    if(itens.length === 0){
        return 
    }

    return (
        <section className="w-md md:w-xl bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-texto">Avaliar Produtos Comprados</h2>
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
                {
                    itens.sort((a, b) => (b.orderProduct.id || 0) - (a.orderProduct.id || 0)) 
                    .map((item) => 
                        item?
                        (
                            <div className='flex flex-col gap-2' key={`o${item.order.id}-p${item.orderProduct.id}`}>
                                <div className="flex items-start gap-4 pb-4">
                                    <Image
                                    src={ item.orderProduct.thumbnail || "/images/placeholder.jpeg"}
                                    alt="Produto"
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-medium text-texto">{ item.orderProduct.title }</h3>
                                        <p className="text-sm text-texto-label mb-2">ID Produto: { item.orderProduct.idProduct.toString().padStart(6,'0') }</p>
                                        <p className="text-sm text-texto-label mb-2">Pedido: F025-C22EG-{item.order.id?.toString().padStart(9,'0')}</p>
                                    </div>
                                </div>
                                <div>
                                    <BtnAvaliar item={item} />
                                </div>
                                <hr className='border-borda' />
                            </div>                            
                        )
                        : <></>
                    )
                }
            </div>
        </section>                    
    )

}

export default AvaliarProdutoss