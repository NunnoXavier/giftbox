import { toCurrencyBr } from "@/services/utils"
import { Order } from "@/types/types"

const Pagamento = ({pedido, valorParc}: {pedido: Order, valorParc?: number}) => {
    return (
    <div className="bg-white p-4 rounded-lg w-md md:w-2xl shadow-md">
        <h1 className="font-bold text-lg text-texto">Pagamento</h1>
        <div className="flex justify-between">
            <h2 className="">Método de Pagamento: </h2>
            <h2 className="">{ pedido.payment?.paymentMethod === 'C'? 'Cartão' : 'PIX' }</h2>
        </div>
        <div className={`${pedido.payment?.paymentMethod === 'C'? 'opacity-100':'opacity-0'}`}>
            <div className="flex justify-between">
                <h2 className="">Nro. do Cartão: </h2>
                <h2 className="">{ pedido.payment?.cardNumber }</h2>
            </div>
            <div className="flex justify-between text-sm">
                <h2 className="">{`${pedido.payment?.parc} parcela${(pedido.payment?.parc || 0) > 1? 's':''} de ${toCurrencyBr(valorParc)}`}</h2>
            </div>
        </div>
    </div>    

    )
}

export default Pagamento