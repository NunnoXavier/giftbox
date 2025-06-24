
import { compararPrecos, createQuerySacola } from "@/localCache/SacolaStore"
import { createStorePedido, inserirPedido, updatePedido } from "@/localCache/PedidoStore"
import { Order, OrderPayment, OrderProduct, User } from "@/types/types"
import { useRouter } from "next/navigation"

export type Precos = {
    id: number,
    price: number,
    discountPercentage: number
}

const useTotalPedido = (usuario:User, precos:Precos[]) => {
    const { data:sacola } = createQuerySacola()
    const router = useRouter()
    const pagto:OrderPayment = {
        cardCvv: usuario.cardCvv,
        cardExpire: usuario.cardExpire,
        cardHolderDoc: usuario.cardHolderDoc,
        cardHolderName: usuario.cardHolderName,
        cardNumber: usuario.cardNumber,
        parc: usuario.cardParc,
        paymentMethod: usuario.paymentMethod,
    }
    
    const pedido = createStorePedido()    

    if(pedido && pedido.idUser !== usuario?.id){
        console.log('pedido diferente do usuario')
        sessionStorage.removeItem('pedido')
    }

    const produtosAlterados = sacola?.filter((item) => {
        const precoCadastro = precos.find((p) => p.id === item.idProduct) || { id: item.idProduct, price: item.price, discountPercentage: item.discountPercentage }
        return !compararPrecos(item, precoCadastro as Precos)
    })

    const produtosRemovidos = sacola?.filter((item) => {
        const precoCadastro = precos.find((p) => p.id === item.idProduct)
        return !precoCadastro
    })
    
    const totalItens = sacola?.reduce((prev, item) => {
        const price = precos.find((p) => p.id === item.idProduct)?.price || item.price
        const preco = ( price|| 0) * item.qtde
        return prev + preco 
    },0)

    const totalDesc = sacola?.reduce((prev, item) => {
        const price = precos.find((p) => p.id === item.idProduct)?.price || item.price
        const discountPercentage = precos.find((p) => p.id === item.idProduct)?.discountPercentage || item.discountPercentage
        const preco = ( price || 0) * item.qtde
        const perc = discountPercentage || 0
        const desc = preco * (perc / 100)
        return prev + desc 
    },0)

    const totalGeral = (totalItens || 0) - (totalDesc || 0)

    const confirmar = async() => {
        try {
            if(pagto?.paymentMethod === 'C' && !pagto.cardNumber || pagto?.cardNumber === ''){
                alert('Você precisa informar os dados do cartão antes de confirmar o pedido.')
                return
            }
    
            if(!usuario?.address || usuario.address === ''){
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
    
            const novoPedido:Order = {
                id: pedido? pedido.id : 0,
                date: new Date(),
                dtprev: new Date(),
                idUser: usuario.id,
                payment: {
                    cardCvv: pagto?.cardCvv,
                    cardExpire: pagto?.cardExpire,
                    cardHolderDoc: pagto?.cardHolderDoc,
                    cardHolderName: pagto?.cardHolderName,
                    cardNumber: pagto?.cardNumber,
                    parc: pagto?.parc,
                    paymentMethod: pagto?.paymentMethod,
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
                products: sacola?.map((item):OrderProduct => ({
                    idProduct: item.idProduct,
                    price: item.price || 0,
                    qtde: item.qtde,
                    title: item.title,
                    discountPercentage: item.discountPercentage,
                    thumbnail: item.thumbnail
                }))
            }
    
            const retornoPedido = !pedido? await inserirPedido(novoPedido) : await updatePedido(novoPedido)
            router.push(`/pedido/${retornoPedido.id?.toString()}`)
            
        } catch (error:any) {
            console.log(error.message)
            alert('Erro ao confirmar pedido')
        }

    }
    
    return {
        produtosAlterados,
        produtosRemovidos,
        totalItens,
        totalDesc,
        confirmar,
        totalGeral
    }
}

export default useTotalPedido