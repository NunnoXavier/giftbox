import BtnVoltar from "@/components/genericos/ BtnVoltar"
import BtnPagar from "@/components/Pedido/BtnPagar"
import ItemPedido from "./components/ItemPedido"
import { Undo2 } from "lucide-react"
import { hookPedido } from "./hooks/hookPedido"
import ValorPedido from "./components/ValorPedido"
import Pagamento from "./components/Pagamento"
import Entrega from "./components/Entrega"

const Pedido = async({ params }: { params: Promise<{id: string }> }) => {
    const id = (await params).id

    if(!id){
        return <h1>Id do pedido não informado na URL!</h1>
    }
    
    const data = await hookPedido(id)

    if(!data.pedido){
        return <h1>Pedido não encontrado!</h1>
    }    

    const valorParc = (data.pedido.payment?.value || 0) - ( data.pedido.payment?.discountPercentage || 0 ) / (data.pedido.payment?.parc || 1)

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-xl text-texto font-bold text-center">Dados do Pedido</h1>
            
            <div className="bg-white p-4  rounded-lg w-md md:w-2xl max-h-96 shadow-md">
               <h1 className="font-bold text-lg text-texto mb-2">Itens do Pedido</h1>
               <div className="overflow-scroll max-h-40">
                {data.pedido.products?.map((produto, index) => (
                    <ItemPedido item={produto} key={index} />
                ))}
               </div>
            </div>
            
            <ValorPedido pedido={data.pedido} />
            <Pagamento pedido={data.pedido} valorParc={valorParc} />
            <Entrega pedido={data.pedido} />
            <div className="flex p-4  justify-between items-center w-md md:w-lg">
                <div className="w-1/6">                    
                    <BtnVoltar><Undo2 /></BtnVoltar>
                </div>
                <div className="w-4/6 place-items-center">
                    <BtnPagar fnPagar={data.handlePagar} status={data.pedido.status!} />
                </div>                
                <div className="w-1/6 "></div> {/* esta div esta aqui somente para manter o botao no meio */}
            </div>

        </div>
    )
}

export default Pedido