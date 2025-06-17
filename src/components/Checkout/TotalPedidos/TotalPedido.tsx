'use client'

import BtnConfirmarPedido from "./BtnConfirmarPedido"
import { toCurrencyBr } from "@/services/utils"
import ToastProdutosRemovidos from "../ToastProdutosRemovidos"
import ToastPrecosAlterados from "../ToastPrecosAlterados"
import useTotalPedido, {Precos} from "./useTotalPedido"
import { User } from "@/types/types"

const TotalPedidos = ({usuario, precos}:{usuario:User, precos:Precos[]}) => {    
    const data = useTotalPedido(usuario, precos)   
    
    return (
        <div className="flex flex-col gap-4 bg-white border border-borda w-full p-4 rounded-lg shadow-md">
            <ToastPrecosAlterados produtosAlterados={data.produtosAlterados} />
            <ToastProdutosRemovidos produtosRemovidos={data.produtosRemovidos} />

            <h2 className="flex justify-between text-sm">
                <span className="whitespace-nowrap">Valor dos Produtos:</span>  
                <span className="whitespace-nowrap">{ toCurrencyBr(data.totalItens) }</span>
            </h2>
            <h2 className="flex justify-between text-sm">
                <span className="whitespace-nowrap">Frete:</span>  
                <span className="whitespace-nowrap">R$ { toCurrencyBr(0) }</span>
            </h2>
            <h2 className="flex justify-between text-sm text-texto2">
                <span className="whitespace-nowrap">Desconto:</span>  
                <span className="whitespace-nowrap">-{ toCurrencyBr(data.totalDesc) }</span>
            </h2>
            <h1 className="flex justify-between text-lg font-bold">
                <span className="whitespace-nowrap">Total do Pedido:</span>  
                <span className="whitespace-nowrap">{ toCurrencyBr(data.totalGeral) }</span>
            </h1>
            <BtnConfirmarPedido acao={data.confirmar}/>
        </div>
    )
}

export default TotalPedidos