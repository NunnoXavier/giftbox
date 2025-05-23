import { actionPagar } from "@/actions/pedidos/actionPagar"
import { fetchPedidos } from "@/cachedFetchs/fetchPedidos"
import BtnVoltar from "@/components/genericos/ BtnVoltar"
import BtnPagar from "@/components/Pedido/BtnPagar"
import { maskCep } from "@/services/useMask"
import { toCurrencyBr } from "@/services/utils"
import { Undo2 } from "lucide-react"

const Pedido = async({ params }: { params: Promise<{id: string }> }) => {
    const id = (await params).id

    if(!id){
        return <h1>Id do pedido não informado na URL!</h1>
    }

    const pedidos = await fetchPedidos()
    const data = pedidos?.find(pedido => pedido.id === Number(id))

    if(!data){
        return <h1>Pedido não encontrado!</h1>
    }

    const pagar = async () => {
        'use server'
        return await actionPagar(data)
    }

    const valorParc = (data.payment?.value || 0) - ( data.payment?.discountPercentage || 0 ) / (data.payment?.parc || 1)

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-xl text-texto font-bold text-center">Confirmacão dos Dados do Pedido</h1>
            
            <div className="bg-white p-4  rounded-lg w-md md:w-lg shadow-md">
                <h1 className="font-bold text-lg text-texto">Valor do Pedido</h1>
                <div className="flex justify-between">
                    <h2 className="">Produto(s): </h2>
                    <h2 className="">{ toCurrencyBr(data.payment?.value) }</h2>
                </div>
                <div className="flex justify-between text-texto2">
                    <h2 className="">Desconto: </h2>
                    <h2 className="">-{ toCurrencyBr(data.payment?.discountPercentage) }</h2>
                </div>
                <div className="flex justify-between font-semibold">
                    <h2 className="">Total Pagamento: </h2>
                    <h2 className=""> { toCurrencyBr(
                            (data.payment?.value || 0) 
                            - (data.payment?.discountPercentage || 0)
                        ) }
                    </h2>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg w-md md:w-lg shadow-md">
                <h1 className="font-bold text-lg text-texto">Pagamento</h1>
                <div className="flex justify-between">
                    <h2 className="">Método de Pagamento: </h2>
                    <h2 className="">{ data.payment?.paymentMethod === 'C'? 'Cartão' : 'PIX' }</h2>
                </div>
                <div className={`${data.payment?.paymentMethod === 'C'? 'opacity-100':'opacity-0'}`}>
                    <div className="flex justify-between">
                        <h2 className="">Nro. do Cartão: </h2>
                        <h2 className="">{ data.payment?.cardNumber }</h2>
                    </div>
                    <div className="flex justify-between text-sm">
                        <h2 className="">{`${data.payment?.parc} parcela${(data.payment?.parc || 0) > 1? 's':''} de ${toCurrencyBr(valorParc)}`}</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4  rounded-lg w-md md:w-lg shadow-md">
                <h1 className="font-bold text-lg text-texto">Entrega</h1>
                <div className="flex gap-2">
                    <h2 className="">{data.shipping?.address}</h2>
                    <h2 className="">({data.shipping?.obs})</h2>

                </div>                
                <div className="flex gap-2">
                    <h2 className="">{data.shipping?.city}</h2>
                    <h2 className="">{data.shipping?.state}</h2>
                    <h2 className="">{ maskCep(data.shipping?.postalCode || "") }</h2>
                </div>                

            </div>
            <div className="flex p-4  justify-between items-center w-md md:w-lg">
                <div className="w-1/3 overflow-hidden">                    
                    <BtnVoltar><Undo2 /></BtnVoltar>
                </div>
                {
                    data.status === "canceled"
                    ?
                    <h1 className="text-texto-alerta font-bold text-lg">Pedido Cancelado</h1>
                    :
                    data.status === "paid"
                    ?
                    <h1 className="text-green-500 font-bold text-lg">Pedido Pago</h1>
                    :
                    data.status === "received"
                    ?
                    <h1 className="text-texto-link font-bold text-lg">Pedido Entrege</h1>
                    :
                    data.status === "sent"
                    ?
                    <h1 className="text-texto-link font-bold text-lg">Pedido Enviado</h1>
                    :
                    <BtnPagar fnPagar={pagar}/>
                } 
                <div className="w-1/3 overflow-hidden"></div> {/* esta div esta aqui somente para manter o botao no meio */}
            </div>

        </div>
    )
}

export default Pedido