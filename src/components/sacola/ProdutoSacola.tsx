'use client'
import { Product, ProductCart } from '@/types/types'
import { PlusCircle, MinusCircle, Trash } from 'lucide-react'
import { createQuerySacola, fetchAddQtdeItem, fetchRemoveItem, fetchSubQtdeItem } from '../Store/SacolaStore'
import { useMutation, useQueryClient } from "@tanstack/react-query"

export type QtdSacolaProps = {
    className?: string
}

const ProdutoSacola = ({ className }:QtdSacolaProps) => {
    
    const {data:itensSacola, error, isError, isLoading} = createQuerySacola()
    
    if (isLoading) return <div>Carregando Sacola...</div>
    if (isError) return <div>Erro: {error.message}</div>
  
    if(!itensSacola){
        return
    }

   
    return (

        <div className={`${className} bg-white flex flex-col gap-2 text-sm w-lg md:w-2xl h-150`}>
            <div className="grid grid-cols-24 gap-2 p-2 font-bold">
                <span className="col-span-7 text-center">Produto</span>
                <span className="col-span-4 text-center">Qtde</span>
                <span className="col-span-4 text-center">Preço(und)</span>
                <span className="col-span-4 text-center">Desct(und)</span>
                <span className="col-span-4 text-center">Total</span>
            </div>                        

            {
                itensSacola.length === 0?
                (
                    <div className="flex justify-center items-center h-full">
                        <span className='text-lg'>Sua sacola está vazia 🥲</span>
                    
                    </div>
                )
                :
                (
                    itensSacola.map((produto) => (
                        <P key={produto.id} produto={produto}/>
                    ))
                )
            }

        </div>
    )
}

const P = ({ produto }:{ produto: ProductCart }) => {

    const queryClient = useQueryClient()

    const { mutateAsync:addQtde } = useMutation({
        mutationFn: fetchAddQtdeItem,
        mutationKey: ['add-qtd-sacola'],
        onSuccess: (_, variables, context) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? data.map((p) => p.id === variables.id? { ...variables }: p) :[]
            })
        }
    })

    const { mutateAsync:subQtde } = useMutation({
        mutationFn: fetchSubQtdeItem,
        mutationKey: ['sub-qtd-sacola'],
        onSuccess: (_, variables, context) => {
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

    const preco = produto?.price? produto.price : 0
    const perc = produto?.discountPercentage? produto.discountPercentage : 0
    const desc = (preco * (perc / 100))
    const promo = (preco - desc) * produto.qtde 

    return (
        <div className="grid grid-cols-24 gap-2 p-2">
            <div className="col-span-7 flex flex-col justify-center items-center">
                <div className="w-1/2">
                    {
                        !produto.thumbnail || produto.thumbnail === ''?
                        (<img src={'/images/placeholder.jpeg'} alt="" />)                                    
                        :(<img src={produto.thumbnail} alt="" />)
                    }
                </div>
                <span className="text-center">{produto.title}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <MinusCircle 
                        className="text-gray-400 hover:text-gray-600" 
                        size={15} 
                        onClick={() => subQtde(produto)} 
                    />
                    <span className="border border-gray-300 px-2 rounded-sm">{produto.qtde}</span>
                    <PlusCircle 
                        className="text-gray-400 hover:text-gray-600" 
                        size={15} 
                        onClick={() => addQtde(produto)} />
                    <Trash 
                        className={`${ produto.qtde === 0? 'block':'hidden' } text-red-500 hover:opacity-90 cursor-pointer`} 
                        size={15} fill='#fb2c36' 
                        onClick={() => removeItem(produto)}
                    />
                </div>                                        
            </div>

            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{preco.toFixed(2)}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right text-violet-800">-{desc.toFixed(2)}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{promo.toFixed(2)}</span>
            </div>
        </div>        
    )
}

export default ProdutoSacola