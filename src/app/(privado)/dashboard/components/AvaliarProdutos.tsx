import { fetchProdutosAvaliar } from '@/serverCache/fetchProdutosAvaliar'
import ItemAvaliar from './ItemAvaliar'

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
            <div className="space-y-6 max-h-96 overflow-y-auto pr-2"> {
                itens.sort((a, b) => (b.orderProduct.id || 0) - (a.orderProduct.id || 0)) 
                .map((item) => 
                    <ItemAvaliar key={`o${item.order.id}-p${item.orderProduct.id}`} item={item} />
                )
            }
            </div>
        </section>                    
    )

}

export default AvaliarProdutoss