'use client'
import { ProductCart } from '@/types/types'
import { PlusCircle, MinusCircle, Trash } from 'lucide-react'
import { createQueryProdutos } from '../Store/ProdutoStore'
import { createQuerySacola, fetchAddQtdeItem, fetchRemoveItem, fetchSubQtdeItem } from '../Store/SacolaStore'
import { useMutation, useQueryClient } from "@tanstack/react-query"

interface ProdutoSacola extends ProductCart {
    title: string,
    thumbnail: string,
    price: number,
    discountPercentage: number,
}

export type QtdSacolaProps = {
    className?: string,
}

const ProdutoSacola = ({ className }:QtdSacolaProps) => {
    
    const {data:itensSacola, error, isError, isLoading} = createQuerySacola()
    
    const {data:pro, error:errorPro, isError:isErrorPro, isLoading:isLoadingPro} = createQueryProdutos()

    if (isLoading) return <div>Carregando Sacola...</div>
    if (isError) return <div>Erro: {error.message}</div>
  
    if(!itensSacola){
        return
    }
    if (isLoadingPro) return <div>Carregando Produtos...</div>
    if (isErrorPro) return <div>Erro: {errorPro.message}</div>
  
    if(!pro){
        return
    }

    const produtos:ProdutoSacola[] = itensSacola.map((i) => {
        const produto = pro.find((p) => p.id === i.idProduct)
        return {
            id: i.id,
            idProduct: i.idProduct,
            qtde: i.qtde,
            title: produto?.title || "PRODUTO NÃO ENCONTRADO",
            thumbnail: produto?.thumbnail || "",
            price: produto?.price || 0,
            discountPercentage: produto?.discountPercentage || 0.
        }
    })

    return (

        <div className={`${className} flex flex-col gap-2 text-sm`}>
            <div className="grid grid-cols-24 gap-2 p-2 font-bold">
                <span className="col-span-4 text-center"></span>
                <span className="col-span-8 text-center">Produto</span>
                <span className="col-span-3 text-center">Qtde</span>
                <span className="col-span-4 text-center">Preço</span>
                <span className="col-span-4 text-center">Desct(%)</span>
            </div>                        

            {
                produtos.map((produto) => (
                    <P key={produto.id} produto={produto}/>
                ))
            }

        </div>
    )
}



const P = ({ produto }:{ produto: ProdutoSacola }) => {

    const queryClient = useQueryClient()

    const { mutateAsync:addQtde } = useMutation({
        mutationFn: fetchAddQtdeItem,
        mutationKey: ['sacola'],
        onSuccess: (_, variables, context) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? data.map((p) => p.id === variables.id? { ...variables }: p) :[]
            })
        }
    })

    const { mutateAsync:subQtde } = useMutation({
        mutationFn: fetchSubQtdeItem,
        mutationKey: ['sacola'],
        onSuccess: (_, variables, context) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? data.map((p) => p.id === variables.id? { ...variables }: p) :[]
            })
        }
    })

    const { mutateAsync:removeItem } = useMutation({
        mutationFn: fetchRemoveItem,
        mutationKey: ['sacola'],
        onSuccess: (_, variables, context) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? data.filter((p) => p.id !== variables.id) :[]
            })
        }
    })

    const itmSacola:ProductCart = {
        id: produto.id,
        idProduct: produto.idProduct,
        qtde: produto.qtde
    }

    return (
        <div className="grid grid-cols-24 gap-2 p-2">
            <div className="col-span-4 flex justify-center items-center">
                {
                    !produto.thumbnail || produto.thumbnail === ''?
                    (<img src={'/images/placeholder.jpeg'} alt="" />)                                    
                    :(<img src={produto.thumbnail} alt="" />)
                }
            </div>
            <div className="col-span-8 flex justify-center items-center">
                <span>{produto.title}</span>
            </div>
            <div className="col-span-3 flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <MinusCircle 
                        className="text-gray-400 hover:text-gray-600" 
                        size={15} 
                        onClick={() => subQtde(itmSacola)} 
                    />
                    <span className="border border-gray-300 px-2 rounded-sm">{produto.qtde}</span>
                    <PlusCircle 
                        className="text-gray-400 hover:text-gray-600" 
                        size={15} 
                        onClick={() => addQtde(itmSacola)} />
                    <Trash 
                        className={`${ produto.qtde === 0? 'block':'hidden' } text-red-500 hover:opacity-90 cursor-pointer`} 
                        size={15} fill='#fb2c36' 
                        onClick={() => removeItem(itmSacola)}
                    />
                </div>                                        
            </div>

            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{produto.price?.toFixed(2)}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{produto.discountPercentage?.toFixed(2)}</span>
            </div>
        </div>        
    )
}

export default ProdutoSacola