import { maskCep } from "@/services/useMask"
import { Order } from "@/types/types"

const Entrega = ({pedido}: {pedido: Order}) => {
    return (
        <div className="bg-white p-4  rounded-lg w-md md:w-2xl shadow-md">
            <h1 className="font-bold text-lg text-texto">Entrega</h1>
            <div className="flex gap-2">
                <h2 className="">{pedido.shipping?.address}</h2>
                <h2 className="">({pedido.shipping?.obs})</h2>

            </div>                
            <div className="flex gap-2">
                <h2 className="">{pedido.shipping?.city}</h2>
                <h2 className="">{pedido.shipping?.state}</h2>
                <h2 className="">{ maskCep(pedido.shipping?.postalCode || "") }</h2>
            </div>                

        </div>        
    )
}

export default Entrega