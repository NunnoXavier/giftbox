'use client'

import { compararPrecos, createQuerySacola, Precos } from "../Store/SacolaStore"
import { Loader } from "lucide-react"
import { createQueryPagto } from "../Store/PagtoStore"
import { useRouter } from "next/navigation"
import { createQueryUsuario } from "../Store/UsuarioStore"
import BtnConfirmarPedido from "./BtnConfirmarPedido"
import Alerta from "../Alerta/Alerta"
import { Order, OrderProduct } from "@/types/types"
import { inserirPedido } from "../Store/PedidoStore"

type TotalPedidosProps = {
    precos: {
        id: number,
        price: number,
        discountpercentage: number,
    }[]
}

const TotalPedidos = ( { precos }:TotalPedidosProps ) => {
    
    const { data:sacola, error, isLoading } = createQuerySacola()
    const { data:pagto, error:errorPagto, isLoading:isLoadingPagto } = createQueryPagto()
    const { data:usuario, error:errorUsuario, isLoading:isLoadingUsuario } = createQueryUsuario() 
    const router = useRouter()
        
    if(!precos){
        return (<><Loader className="animate-spin m-auto" /></>) 
    }

    if(error){
        console.log(error.message)
    }
    
    if(isLoading || isLoadingPagto || isLoadingUsuario){
        return (<><Loader className="animate-spin m-auto" /></>)    
    }

    if(!sacola){
        return 
    }
    
    if(errorPagto){
        console.log(errorPagto.message)
    }

    if(errorUsuario){
        console.log(errorUsuario.message)
    }
    
    if(!pagto){
        return 
    }

    if(!usuario){
        return 
    }

    const produtosAlterados = sacola.filter((item) => {
        const precoCadastro = precos.find((p) => p.id === item.idProduct) || { id: item.idProduct, price: item.price, discountpercentage: item.discountPercentage }
        return !compararPrecos(item, precoCadastro as Precos)
    })

    const produtosRemovidos = sacola.filter((item) => {
        const precoCadastro = precos.find((p) => p.id === item.idProduct)
        return !precoCadastro
    })
    
    const totalItens = sacola.reduce((prev, item) => {
        const price = precos.find((p) => p.id === item.idProduct)?.price || item.price
        const preco = ( price|| 0) * item.qtde
        return prev + preco 
    },0)

    const totalDesc = sacola.reduce((prev, item) => {
        const price = precos.find((p) => p.id === item.idProduct)?.price || item.price
        const discountPercentage = precos.find((p) => p.id === item.idProduct)?.discountpercentage || item.discountPercentage
        const preco = ( price || 0) * item.qtde

        const perc = discountPercentage || 0
        const desc = preco * (perc / 100)
        return prev + desc 
    },0)


    const confirmar = async() => {
        if(pagto.paymentMethod === 'C' && !pagto.cardNumber || pagto.cardNumber === ''){
            alert('Você precisa informar os dados do cartão antes de confirmar o pedido.')
            return
        }

        if(!usuario.address || usuario.address === ''){
            alert('Você precisa informar o endereço de entrega antes de confirmar o pedido.')
            return
        }

        if(!usuario.city || usuario.city === ''){
            alert('Você precisa informar a cidade onde será engtregue.')
            return
        }

        if(!usuario.state || usuario.state === ''){
            alert('Você precisa informar o Estado onde será entregue.')
            return
        }
        if(!usuario.postalCode || usuario.postalCode === ''){
            alert('Você precisa informar o CEP.')
            return
        }

        const pedido:Order = {
            id: 0,
            date: new Date(),
            dtprev: new Date(),
            idUser: usuario.id,
            payment: {
                cardCvv: pagto.cardCvv,
                cardExpire: pagto.cardExpire,
                cardHolderDoc: pagto.cardHolderDoc,
                cardHolderName: pagto.cardHolderName,
                cardNumber: pagto.cardNumber,
                parc: pagto.parc,
                paymentMethod: pagto.paymentMethod,
                value: totalItens,
                discountPercentage: totalDesc 
            },
            shipping: {
                address: usuario.address,
                city: usuario.city,
                daysprev: 3, //implementar previsao de entrega
                obs: usuario.obs,
                postalCode: usuario.postalCode,
                state: usuario.state,
                value: 0, //implementar valor de frete
            },
            products: sacola.map((item):OrderProduct => ({
                idProduct: item.idProduct,
                price: item.price || 0,
                qtde: item.qtde,
                title: item.title,
                discountPercentage: item.discountPercentage,
                thumbnail: item.thumbnail
            }))
        }

        const p = await inserirPedido(pedido)
        if(p){
            router.push(`/pedido/${p.id}`)
        }else{
            //adicionar mensagem de erro            
        }

    }    


    return (
        <div className="flex flex-col gap-4 bg-white border border-gray-200 w-full p-4 rounded-lg">
                {
                    produtosAlterados.length > 0?
                    (
                        <Alerta indice={0} visivel={true} titulo="Os seguintes produtos sofreram alteração de preço:">
                            {
                                produtosAlterados.map((p, i) => (
                                    <p key={i}>{p.title}</p>                            
                                ))
                            }
                        </Alerta>

                    ) 
                    :
                    (<></>)
                }

                {
                    produtosRemovidos.length > 0?
                    (
                        <Alerta indice={1} visivel={true} titulo="Os seguintes produtos não estão mais disponiveis:">
                            {
                                produtosRemovidos.map((p, i) => (
                                    <p key={i}>{p.title}</p>                            
                                ))
                            }
                        </Alerta>

                    ) 
                    :
                    (<></>)
                }
            <h2 className="flex justify-between text-sm">
                <span className="whitespace-nowrap">Valor dos Produtos:</span>  
                <span className="whitespace-nowrap">R$ { totalItens.toFixed(2) }</span>
            </h2>
            <h2 className="flex justify-between text-sm">
                <span className="whitespace-nowrap">Frete:</span>  
                <span className="whitespace-nowrap">R$ { (0).toFixed(2) }</span>
            </h2>
            <h2 className="flex justify-between text-sm text-violet-500">
                <span className="whitespace-nowrap">Desconto:</span>  
                <span className="whitespace-nowrap">R$ -{ totalDesc.toFixed(2) }</span>
            </h2>
            <h1 className="flex justify-between text-lg font-bold">
                <span className="whitespace-nowrap">Total do Pedido:</span>  
                <span className="whitespace-nowrap">R$ { (totalItens - totalDesc).toFixed(2) }</span>
            </h1>
            <BtnConfirmarPedido acao={confirmar}/>
        </div>
    )
}

export default TotalPedidos