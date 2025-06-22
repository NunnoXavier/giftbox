import FormasDePagto from "@/components/Checkout/Pagamento/FormasDePagto/FormasDePagto"
import Cartao from "@/components/Checkout/Pagamento/Cartao/Cartao"
import { User } from "@/types/types"

const Pagamento = async ({usuario}:{usuario:User}) => {

    if(!usuario){
        return <></>
    }

    return (
        <div className="bg-white flex flex-col border border-borda w-full rounded-md p-4 shadow-md">
            <h1 className="font-bold mb-2">{`Forma de Pagamento`}</h1>
            <FormasDePagto initUser={usuario}/>            
            <div className="">
                <div className={`${usuario.paymentMethod === ''? 'h-full opacity-100':'h-0 opacity-0'} overflow-hidden p-2 transition-all ease-in-out duration-500`}>
                    <h1 className="font-semibold text-texto-label mb-2">Escolha uma Forma de Pagamento</h1>
                </div>
                <div className={`${usuario.paymentMethod === 'P'? 'h-full opacity-100':'h-0 opacity-0'} overflow-hidden p-2 text-texto-label transition-all ease-in-out duration-500`}>
                    <h1 className="font-semibold ">PIX selecionado</h1>
                    <span className="text-sm mb-2">Um código Pix será gerado após finalização do pedido. 
                        O código PIX terá validade de 30 minutos. 
                    </span>
                </div>
                <div className={`${usuario.paymentMethod === 'C'? 'h-full opacity-100':'h-0 opacity-0'} overflow-hidden p-2 text-texto-label transition-all ease-in-out duration-500`}>
                    <Cartao initUser={ usuario } />
                </div>
            </div>
        </div>
    )
}

export default Pagamento