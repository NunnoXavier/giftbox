import { actionPagar } from "@/actions/pedidos/actionPagar"
import { actionStatusPedido } from "@/actions/pedidos/actionStatusPedido"
import { actionAlterarEstoque } from "@/actions/produtos/actionAlterarEstoque"
import { actionRevalidarEstoque } from "@/actions/produtos/actionRevalidarEstoque"
import { actionRevalidarProdutos } from "@/actions/produtos/actionRevalidarProdutos"
import { actionEnviarEmail } from "@/actions/usuarios/actionEnviarEmail"
import { fetchPedidos } from "@/cachedFetchs/fetchPedidos"
import BtnVoltar from "@/components/genericos/ BtnVoltar"
import BtnPagar from "@/components/Pedido/BtnPagar"
import ItemPedido from "@/components/Pedidos/ItemPedido"
import { maskCep } from "@/services/useMask"
import { diferencaEntreDatas, toCurrencyBr } from "@/services/utils"
import { Order } from "@/types/types"
import { Undo2 } from "lucide-react"
import { redirect } from "next/navigation"

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

    const pagar = async (data:Order): Promise<{ data:boolean|null, error:string|null }|undefined> => {
        'use server'

        if(!data){
            return { data:null, error: 'Pedido não encontrado!'}
        }

        if(!data?.products){
            return { data:null, error: 'Pedido não encontrado!'}
        }

        if(diferencaEntreDatas(new Date(), new Date(data.date!.toString().slice(0,10))) > 1){
            await actionStatusPedido({idPedido: data.id!, novoStatus: 'expired'})
            redirect(`/pedido/${data.id}`) 
        }

        try {
            const promises = data.products?.map((produto) => {
                return actionAlterarEstoque({ id:produto.idProduct!, qtde:produto.qtde})
            })

            const atualizarEstoque = await Promise.all(promises)

            if(!atualizarEstoque){
                return { data:null, error: 'Erro ao atualizar estoque!'}
            }

            actionRevalidarEstoque()

            const { data: resultPagto, error:errorPagto } = await actionPagar(data)
            if(errorPagto){
                return { data:null, error: 'Erro ao pagar pedido!'}
            }

            if( resultPagto === false){
                // rollback de estoque
                const promises = data.products?.map((produto) => {
                    return actionAlterarEstoque({ id:produto.idProduct!, qtde:produto.qtde * -1})
                })

                const atualizarEstoque = await Promise.all(promises)

                if(!atualizarEstoque){
                    return { data:null, error: 'Erro ao atualizar estoque!'}
                }

                actionRevalidarEstoque()                
                actionRevalidarProdutos()                
            }
            
            resultPagto && await actionStatusPedido({ idPedido:data.id!, novoStatus: "paid" })            

            resultPagto && actionEnviarEmail('Pagamento realizado com sucesso!', `Seu pedido numero ${data.id} foi pago com sucesso!
                para acompanhar o status do seu pedido, acesse o link: http://localhost:3000/pedidos/${data.id}` )

            return { data:resultPagto, error: null}

        } catch (error:any) {
            console.log(error.message)
            return { data:null, error: error.message}
        }
    }

    const valorParc = (data.payment?.value || 0) - ( data.payment?.discountPercentage || 0 ) / (data.payment?.parc || 1)

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-xl text-texto font-bold text-center">Confirmacão dos Dados do Pedido</h1>
            
            <div className="bg-white p-4  rounded-lg w-md md:w-2xl max-h-96 shadow-md">
               <h1 className="font-bold text-lg text-texto mb-2">Itens do Pedido</h1>
               <div className="overflow-scroll max-h-40">
                {data.products?.map((produto, index) => (
                        <ItemPedido item={produto} key={index} />
                ))}

               </div>
            </div>
            
            <div className="bg-white p-4  rounded-lg w-md md:w-2xl shadow-md">
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
            
            <div className="bg-white p-4 rounded-lg w-md md:w-2xl shadow-md">
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

            <div className="bg-white p-4  rounded-lg w-md md:w-2xl shadow-md">
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
                    data.status === "expired"
                    ?
                    <h1 className="text-texto-label font-bold text-lg">Pedido Expirado</h1>
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
                    <BtnPagar fnPagar={ async () => {
                        'use server'
                        return await pagar(data) 
                    }}/>
                } 
                <div className="w-1/3 overflow-hidden"></div> {/* esta div esta aqui somente para manter o botao no meio */}
            </div>

        </div>
    )
}

export default Pedido