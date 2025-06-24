import { actionPagar } from "@/actions/pedidos/actionPagar"
import { actionStatusPedido } from "@/actions/pedidos/actionStatusPedido"
import { actionAlterarEstoque } from "@/actions/produtos/actionAlterarEstoque"
import { actionRevalidarEstoque } from "@/actions/produtos/actionRevalidarEstoque"
import { actionRevalidarProdutos } from "@/actions/produtos/actionRevalidarProdutos"
import { actionEnviarEmail } from "@/actions/usuarios/actionEnviarEmail"
import { fetchPedido } from "@/serverCache/fetchPedidos"
import { diferencaEntreDatas } from "@/services/utils"
import { Order, OrderProduct } from "@/types/types"
import { redirect } from "next/navigation"

export const hookPedido = async (id: string) => {
    const pedido = (await fetchPedido(Number(id)))
    
    const handlePagar = async (): Promise<boolean|null> => {
        'use server'

        if(diferencaEntreDatas(new Date(), new Date(pedido.date!.toString().slice(0,10))) > 1){
            await actionStatusPedido({idPedido: pedido.id!, novoStatus: 'expired'})
            redirect(`/pedido/${pedido.id}`) 
        }

        try {
            atualizarEstoque(pedido.products)

            const { data: resultPagto, error:errorPagto } = await actionPagar(pedido)
            if(errorPagto || resultPagto === null){
                rollbackEstoque(pedido.products)
                return null //retorna nulo para indicar que houve erro no sistema e não no pagamento
            }

            if( resultPagto === false){
                rollbackEstoque(pedido.products)
            }
            
            resultPagto && await actionStatusPedido({ idPedido:pedido.id!, novoStatus: "paid" })            

            
            enviarEmail(pedido, resultPagto)

            return resultPagto

        } catch (error:any) {
            console.log(error.message)
            return false
        }
    }    

    return {
        handlePagar,
        pedido
    }
}

const atualizarEstoque = async (produtos?: OrderProduct[]) => {
    if(!produtos || produtos.length === 0){
        return
    }
    
    const promises = produtos.map((produto) => {
        return actionAlterarEstoque({ id:produto.id!, qtde:produto.qtde})
    })

    await Promise.all(promises)
    actionRevalidarEstoque()                
    actionRevalidarProdutos()
}

const rollbackEstoque = async (produtos?: OrderProduct[]) => {
    if(!produtos || produtos.length === 0){
        return
    }
    
    const promises = produtos.map((produto) => {
        return actionAlterarEstoque({ id:produto.idProduct!, qtde:produto.qtde * -1})
    })

    await Promise.all(promises)
    actionRevalidarEstoque()                
    actionRevalidarProdutos()
}

const enviarEmail = async (pedido: Order, resultPagto: boolean) => {
    if(!resultPagto){
        actionEnviarEmail('Pagamento recusado!', `O pagamento do pedido número ${pedido.id} foi rejeitado pela instituição financeira.` )
    }
    
    actionEnviarEmail('Pagamento realizado com sucesso!', `Seu pedido numero ${pedido.id} foi pago com sucesso!
        para acompanhar o status do seu pedido, acesse o link: http://localhost:3000/pedidos/${pedido.id}` )    
}