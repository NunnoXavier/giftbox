import { toCurrencyBr } from "@/services/utils"
import { Order } from "@/types/types"

const ValorPedido = ({pedido}: {pedido: Order}) => {

    return (
        <div className="bg-white p-4  rounded-lg w-md md:w-2xl shadow-md">
            <h1 className="font-bold text-lg text-texto">Valor do Pedido</h1>
            <div className="flex justify-between">
                <h2 className="">Produto(s): </h2>
                <h2 className="">{ toCurrencyBr(pedido.payment?.value) }</h2>
            </div>
            <div className="flex justify-between text-texto2">
                <h2 className="">Desconto: </h2>
                <h2 className="">-{ toCurrencyBr(pedido.payment?.discountPercentage) }</h2>
            </div>
            <div className="flex justify-between font-semibold">
                <h2 className="">Total Pagamento: </h2>
                <h2 className=""> { toCurrencyBr(
                        (pedido.payment?.value || 0) 
                        - (pedido.payment?.discountPercentage || 0)
                    ) }
                </h2>
            </div>
        </div>        
    )
}

export default ValorPedido