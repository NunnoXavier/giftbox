import { fetchPedidos } from "@/cachedFetchs/fetchPedidos"
import BtnVoltar from "@/components/genericos/ BtnVoltar"
import BtnPagar from "@/components/Pedido/BtnPagar"
import ItemPedido from "./components/ItemPedido"
import { Undo2 } from "lucide-react"
import hooks from "./hooks/data"
import ValorPedido from "./components/ValorPedido"
import Pagamento from "./components/Pagamento"
import Entrega from "./components/Entrega"

const Pedido = async({ params }: { params: Promise<{id: string }> }) => {
    const id = (await params).id

    if(!id){
        return <h1>Id do pedido não informado na URL!</h1>
    }

    const pedidos = await fetchPedidos()
    const pedido = pedidos?.find(pedido => pedido.id === Number(id))

    if(!pedido){
        return <h1>Pedido não encontrado!</h1>
    }    

    const data = hooks(pedido)

    const valorParc = (pedido.payment?.value || 0) - ( pedido.payment?.discountPercentage || 0 ) / (pedido.payment?.parc || 1)


    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-xl text-texto font-bold text-center">Dados do Pedido</h1>
            
            <div className="bg-white p-4  rounded-lg w-md md:w-2xl max-h-96 shadow-md">
               <h1 className="font-bold text-lg text-texto mb-2">Itens do Pedido</h1>
               <div className="overflow-scroll max-h-40">
                {pedido.products?.map((produto, index) => (
                    <ItemPedido item={produto} key={index} />
                ))}
               </div>
            </div>
            
            <ValorPedido pedido={pedido} />            
            <Pagamento pedido={pedido} valorParc={valorParc} />
            <Entrega pedido={pedido} />
            <div className="flex p-4  justify-between items-center w-md md:w-lg">
                <div className="w-1/6">                    
                    <BtnVoltar><Undo2 /></BtnVoltar>
                </div>
                <div className="w-4/6 place-items-center">
                    <BtnPagar fnPagar={data.handlePagar} status={pedido.status!} />
                </div>                
                <div className="w-1/6 "></div> {/* esta div esta aqui somente para manter o botao no meio */}
            </div>

        </div>
    )
}

export default Pedido