import BtnPagar from "@/components/Pedido/BtnPagar"
import { cep } from "@/services/useMask"
import { Order } from "@/types/types"
import { Undo2 } from "lucide-react"
import { cookies } from "next/headers"
import { redirect } from 'next/navigation'

const Pedido = async({ params }: { params: Promise<{id: string }> }) => {
    const id = (await params).id
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
    const res = await fetch(`http://localhost:3000/api/pedidos/${id}`, {
        method: "GET",
        headers: { Cookie:`SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}` },
    })

    const { data, error }:{ data:Order, error:string } = await res.json()

    if(!data){
        console.log(error)
    }

    const pagar = async () => {
        'use server'
        

        const res = await fetch('http://localhost:3000/api/mock',{
            method: 'POST',
            body: JSON.stringify(data)
        })

        const { data:result, error:errorResult} = await res.json()

        if(data){
            
            redirect('/confirmacao-pagto')
        }
    }    

    const valorParc = (data.payment?.value || 0) - ( data.payment?.discountPercentage || 0 ) / (data.payment?.parc || 1)

    return (
        <form action={pagar} className="flex flex-col gap-4 items-center">
            <h1 className="text-xl text-gray-700 font-bold text-center">Confirmacão dos Dados do Pedido</h1>
            
            <div className="bg-white p-4  rounded-lg w-md md:w-lg">
                <h1 className="font-bold text-lg text-gray-700">Valor do Pedido</h1>
                <div className="flex justify-between">
                    <h2 className="">Produto(s): </h2>
                    <h2 className="">R$ { data.payment?.value?.toFixed(2) }</h2>
                </div>
                <div className="flex justify-between text-violet-500">
                    <h2 className="">Desconto: </h2>
                    <h2 className="">-R$ { data.payment?.discountPercentage?.toFixed(2) }</h2>
                </div>
                <div className="flex justify-between font-semibold">
                    <h2 className="">Total Pagamento: </h2>
                    <h2 className="">R$ { (
                            (data.payment?.value || 0) 
                            - (data.payment?.discountPercentage || 0)
                        ).toFixed(2) }
                    </h2>
                </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg w-md md:w-lg">
                <h1 className="font-bold text-lg text-gray-700">Pagamento</h1>
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
                        <h2 className="">{`${data.payment?.parc} parcela${(data.payment?.parc || 0) > 1? 's':''} de R$ ${valorParc.toFixed(2)}`}</h2>
                    </div>
                </div>
            </div>

            <div className="bg-white p-4  rounded-lg w-md md:w-lg">
                <h1 className="font-bold text-lg text-gray-700">Entrega</h1>
                <div className="flex gap-2">
                    <h2 className="">{data.shipping?.address}</h2>
                    <h2 className="">({data.shipping?.obs})</h2>

                </div>                
                <div className="flex gap-2">
                    <h2 className="">{data.shipping?.city}</h2>
                    <h2 className="">{data.shipping?.state}</h2>
                    <h2 className="">{ cep(data.shipping?.postalCode || "") }</h2>
                </div>                

            </div>
            <div className="flex p-4  justify-between items-center w-md md:w-lg">
                <div className="w-1/3 overflow-hidden">
                    <a href="/checkout" className="text-blue-600"><Undo2 /></a>                
                </div> 
                <BtnPagar fnPagar={pagar}/>
                <div className="w-1/3 overflow-hidden"></div> {/* esta div esta aqui somente para manter o botao no meio */}
            </div>

        </form>
    )
}

export default Pedido