import Pedido from "@/app/(privado)/pedidos/components/Pedido"
import { fetchPedidos } from "@/serverCache/fetchPedidos"

const Pedidos = async () => {    
    const data = await fetchPedidos()

    if(!data){
        return (
            <h1>Ocorreu um erro ao buscar os pedidos. Tente mais tarde!</h1>
        )
    }

    return (
        <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl text-texto text-center">Seus Pedidos</h1>
            <div className="flex flex-col items-center w-md md:w-5xl overflow-hidden">
                {
                    data.length === 0 ? 
                    (
                        <h1 className="text-lg m-auto pt-4">Você ainda não tem nenhum pedido 😕!</h1>
                    ) : 
                    (
                        data
                        .sort((a, b) => (Number(a.id) < Number(b.id)? 1 : -1))
                        .map((pedido) => (<Pedido key={pedido.id} pedido={ pedido } />))

                    )
                }
            </div>
        </div>
    )
}

export default Pedidos