'use client'

import { OrderPayment } from "@/types/types"

import { useEffect, useState } from "react"
import Cartao from "./Cartao"
import {  createQueryPagto, fetchAddDadosPagto } from "@/components/Store/PagtoStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const FormasDePagto = () => {
    const [ formaPagto, setFormaPagto ] = useState('')
    const { data:dataPagto, error:errorPagto } = createQueryPagto()
    if(errorPagto){
        console.log(errorPagto.message)
    }    
    
    const queryClient = useQueryClient()

    useEffect(() => {
        setFormaPagto(dataPagto?.paymentMethod || '')
    },[dataPagto])
    
    
    const { mutateAsync:addDadosPagto } = useMutation({
        mutationFn: fetchAddDadosPagto,
        mutationKey: ['add-dados-cartao'],
        onSuccess: (_, variables) => {
            queryClient.setQueryData<OrderPayment>(['pagto'], data => {
                return { ...variables }
            })    
        }
    })

    return (
        <div className="bg-white flex flex-col">
            <div className="flex gap-2">
                <button 
                    className={`${formaPagto === 'P'? 'bg-borda2':'bg-white'} px-2 w-1/2 border border-borda rounded-full`}
                    onClick={() => { 
                        setFormaPagto('P')
                        addDadosPagto({ paymentMethod: 'P' })
                    }}
                >
                    PIX
                </button>
                <button 
                    className={`${formaPagto === 'C'? 'bg-borda2':'bg-white'} px-2 w-1/2 border border-borda rounded-full`}
                    onClick={() => {
                        setFormaPagto('C')
                        addDadosPagto({ paymentMethod: 'C' })
                    }}
                >
                    Cartão
                </button>
            </div>
            <div className="">
                <div className={`${formaPagto === ''? 'h-full opacity-100':'h-0 opacity-0'} overflow-hidden p-2 transition-all ease-in-out duration-500`}>
                    <h1 className="font-semibold text-texto-label mb-2">Escolha uma Forma de Pagamento</h1>
                </div>
                <div className={`${formaPagto === 'P'? 'h-full opacity-100':'h-0 opacity-0'} overflow-hidden p-2 text-texto-label transition-all ease-in-out duration-500`}>
                    <h1 className="font-semibold ">PIX selecionado</h1>
                    <span className="text-sm mb-2">Um código Pix será gerado após finalização do pedido. 
                        O código PIX terá validade de 30 minutos. 
                    </span>
                </div>
                <div className={`${formaPagto === 'C'? 'h-full opacity-100':'h-0 opacity-0'} overflow-hidden p-2 text-texto-label transition-all ease-in-out duration-500`}>
                    <Cartao fnAlterarDados={ addDadosPagto }/>
                </div>
            </div>
        </div>
    )
}

export default FormasDePagto