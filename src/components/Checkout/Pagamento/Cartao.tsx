'use client'

import { createQueryUsuario, updateUsuario } from "@/components/Store/UsuarioStore"
import { OrderPayment, User } from "@/types/types"
import { LucideLoader as IconeEspera } from 'lucide-react'
import { useEffect, useState } from "react"
import { cpfCnpj, cartao, validadeCartao } from "@/services/useMask"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createQueryPagto } from "@/components/Store/PagtoStore"

const initUser: User = {
    id: 0,
    email: "",
    role: "client",
    cardExpire: "",
    cardNumber: "",
}

const Cartao = ({ fnAlterarDados }:{ fnAlterarDados:(o:OrderPayment) => Promise<OrderPayment> }) => {
    const [ usuario, setUsuario ] = useState(initUser)
    const [ parc, setParc ] = useState(1)
    const { data, error, isError, isLoading } = createQueryUsuario()
    const [ salvando, setSalvando ] = useState(false)
    const [ salvo, setSalvo ] = useState(true)

    const { data:dataPagto, error:errorPagto } = createQueryPagto()
    if(errorPagto){
        console.log(errorPagto.message)
    }

    const queryClient = useQueryClient()
        
    useEffect(() => {
        if(!data){
            return
        }
        setUsuario(data)
    },[data])
    
    useEffect(() => {
        if(!dataPagto){
            return
        }        
        setParc(dataPagto.parc || 1)
        setSalvo( compararUsuario() )
    },[dataPagto])
    
    useEffect(() => {
        alterarDadosLocais()
        setSalvo( compararUsuario() )
    },[usuario, parc])

    const { mutateAsync:altUsuario } = useMutation({
        mutationKey: ['usuario'],
        mutationFn: updateUsuario,
        onSuccess: (_, variables) => {
            queryClient.setQueryData<User>(['usuario'], data => {
                return {
                    ...variables
                }
            })
        }
    })

    const compararUsuario = ():boolean => {
        if(!data){
            return true
        }

        if(!dataPagto){
            return true
        }

        if(parc !== dataPagto.parc){
            return false
        }
        
        for(const chave in usuario){
            const key = chave as keyof User
            
            if(!(key in data)){
                return false
            }

            if(data[key] !== usuario[key]){
                return false
            }

        }
        return true
    }

    const salvar = async () => {
        if(salvo) return
        try {
            setSalvando(true)
            if(confirm('deseja salvar os dados do cartão para compras futuras?')){
                await altUsuario(usuario)
            }
            await alterarDadosLocais()
        } finally{
            setSalvando(false)            
        }        
    }

    const alterarDadosLocais = async () => {
        await fnAlterarDados({
            cardCvv: usuario.cardCvv,
            cardExpire: usuario.cardExpire,
            cardHolderDoc: usuario.cardHolderDoc,
            cardHolderName: usuario.cardHolderName,
            cardNumber: usuario.cardNumber,
            paymentMethod: 'C',
            parc: parc
        })        
    }


    if(isLoading){
        return (
            <IconeEspera className="animate-spin" size={15}/>
        )
    }

    if(isError){
        console.log('erro ao ler dados do usuario: ' + error.message)
        return
    }

    
    return (
        <div className={`${salvando? 'text-gray-200' : ''}`}>
            <h1 className="font-semibold  mb-2">Cartão selecionado</h1>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <div className="flex flex-col w-5/12">
                        <span className="text-sm">CPF/CNPJ do Titular</span>
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md px-2"
                            value={usuario?.cardHolderDoc || ""}
                            onChange={(e) => setUsuario({ ...usuario, cardHolderDoc: cpfCnpj(e.currentTarget.value.slice(0,18))}) }
                            />
                    </div>
                    <div className="flex flex-col w-7/12">
                        <span className="text-sm">Nome Completo do Titular</span>
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md px-2"
                            value={usuario?.cardHolderName || ""}
                            onChange={(e) => setUsuario({ ...usuario, cardHolderName: e.currentTarget.value.toUpperCase().slice(0,99) }) }
                            />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-6/12">
                        <span className="text-sm">Número do Cartão</span>
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md px-2"
                            value={usuario?.cardNumber || ""}
                            onChange={(e) => {
                                const novoValor = cartao(e.currentTarget.value.slice(0,19))
                                setUsuario((prev)=>({ 
                                    ...prev, 
                                    cardNumber: novoValor 
                                })) 
                            }}
                            />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <span className="text-sm">Validade</span>
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md px-2"
                            placeholder="dd/aa"
                            value={validadeCartao(usuario?.cardExpire || "")}
                            onChange={(e) => setUsuario({ ...usuario, cardExpire: e.currentTarget.value.slice(0,5) }) }
                            />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <span className="text-sm">CVV</span>
                        <input 
                            type="number" 
                            className="border border-gray-200 rounded-md px-2"
                            value={usuario?.cardCvv?.toString() || ""}
                            onChange={(e) => setUsuario({ ...usuario, cardCvv: Number(e.currentTarget.value.slice(0,3)) }) }
                        />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <span className="text-sm">Qtd. Parc.</span>
                        <input 
                            type="number" 
                            className="border border-gray-200 rounded-md px-2"
                            value={ parc.toString() }
                            min={1} max={6}
                            onChange={(e) => setParc( Number(e.currentTarget.value) ) }
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end py-2">
                <button 
                    className={`${salvo? 'bg-white text-gray-200':'bg-violet-500 text-white'} border  text-sm   py-1 px-4 rounded-full`}
                    onClick={salvar}
                >
                    Salvar dados do Cartão
                </button>
            </div> 
        </div>        
    )
}

export default Cartao