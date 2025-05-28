'use client'
import { ProductCart } from '@/types/types'
import { PlusCircle, MinusCircle, Trash } from 'lucide-react'
import { createQuerySacola, fetchAddQtdeItem, fetchRemoveItem, fetchSubQtdeItem } from '../Store/SacolaStore'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Image from 'next/image'
import BtnEsvaziarSacola from './BtnEsvaziarSacola'
import { toCurrencyBr } from '@/services/utils'
import { useEffect, useState } from 'react'
import { fetchPrecoProdutos } from '@/cachedFetchs/fetchsProdutos'

type Precos = {
    id: number,
    price: number,
    discountPercentage: number,
}

const ProdutoSacola = () => {
    
    const {data:itensSacola, error, isError} = createQuerySacola()
    const [ precos, setPrecos] = useState<Precos[]>([])

    useEffect(() => {
        fetchPrecoProdutos()
        .then((data) => {
            setPrecos(data)
        })
        .catch((error) => {
            console.log(error)
        })

    }, [])
      
    if (isError) return <div>Erro: {error.message}</div>
  
    if(!itensSacola){
        return
    }

    return (
        <div className="col-span-1 md:col-span-12 border-borda rounded-md shadow-md bg-white">
            <div className="grid grid-cols-24 gap-2 p-2 font-bold">
                <span className="col-span-7 text-center">Produto</span>
                <span className="col-span-4 text-center">Qtde</span>
                <span className="col-span-4 text-center">Preço(und)</span>
                <span className="col-span-4 text-center">Desct(und)</span>
                <span className="col-span-4 text-center">Total</span>
            </div>                        
            <div className={`flex flex-col gap-2 overflow-scroll text-sm 
            w-lg md:w-2xl h-150 `}>

                {
                    itensSacola.length === 0?
                    (
                        <div className="flex justify-center items-center h-full">
                            <span className='text-lg'>Sua sacola está vazia 🥲</span>
                        
                        </div>
                    )
                    :
                    (
                        itensSacola.map((produto) => {
                            const valores = precos.find((p) => p.id === produto.idProduct)
                            return (
                                <P key={produto.id} produto={produto} valores={valores} />
                            )
                        })
                    )
                }

            </div>
            <div className="flex justify-end items-center gap-2 p-2">
                <BtnEsvaziarSacola />
            </div>
        </div>                    
    )
}

const P = ({ produto, valores }:{ produto: ProductCart, valores?: Precos }) => {

    const queryClient = useQueryClient()

    const { mutateAsync:addQtde } = useMutation({
        mutationFn: fetchAddQtdeItem,
        mutationKey: ['add-qtd-sacola'],
        onSuccess: (_, variables) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? data.map((p) => p.id === variables.id? { ...variables }: p) :[]
            })
        }
    })

    const { mutateAsync:subQtde } = useMutation({
        mutationFn: fetchSubQtdeItem,
        mutationKey: ['sub-qtd-sacola'],
        onSuccess: (_, variables) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? data.map((p) => p.id === variables.id? { ...variables }: p) :[]
            })
        }
    })

    const { mutateAsync:removeItem } = useMutation({
        mutationFn: fetchRemoveItem,
        mutationKey: ['remove-sacola'],
        onSuccess: (_, variables, context) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? data.filter((p) => p.id !== variables.id) :[]
            })
        }
    })

    const preco = valores?.price? valores.price 
        : produto.price? produto.price : 0
    const perc = valores?.discountPercentage? valores.discountPercentage 
        : produto.discountPercentage? produto.discountPercentage : 0
    const desc = (preco * (perc / 100))
    const promo = (preco - desc) * produto.qtde 

    return (
        <div className="grid grid-cols-24 gap-2 p-2">
            <div className="col-span-7 flex flex-col justify-center items-center">
                <div className="w-1/2">
                    {
                        !produto.thumbnail || produto.thumbnail === ''?
                        (<Image src={'/images/placeholder.jpeg'} alt="" 
                            width={100} height={100}    
                        />)                                    
                        :(<Image src={produto.thumbnail} alt="" 
                            width={100} height={100}    
                        />)
                    }
                </div>
                <span className="text-center">{produto.title}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <MinusCircle 
                        className="text-texto-label hover:text-texto" 
                        size={15} 
                        onClick={() => subQtde(produto)} 
                    />
                    <span className="border border-borda px-2 rounded-sm">{produto.qtde}</span>
                    <PlusCircle 
                        className="text-texto-label hover:text-texto" 
                        size={15} 
                        onClick={() => addQtde(produto)} />
                    <Trash 
                        className={`${ produto.qtde === 0? 'block':'hidden' } text-texto-alerta hover:opacity-90 cursor-pointer`} 
                        size={15} fill='#fb2c36' 
                        onClick={() => removeItem(produto)}
                    />
                </div>                                        
            </div>

            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{toCurrencyBr(preco)}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right text-texto2">-{toCurrencyBr(desc)}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{toCurrencyBr(promo)}</span>
            </div>
        </div>        
    )
}

export default ProdutoSacola