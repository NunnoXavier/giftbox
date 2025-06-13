'use client'

import { useState } from "react"
import BtnAdicionarProduto from "./BtnAdicionarProduto"
import { ArrowLeft, Loader2, PlusCircle as Plus } from "lucide-react"
import { MinusCircle as Minus } from "lucide-react"
import { Product } from "@/types/types"


type ProdutosProps = {
    initialData?: Product[]
    action: (produtos: Product[]) => Promise<boolean>
}

const Produtos = ({ initialData, action }: ProdutosProps) => {
    const [produtos, setProdutos] = useState<Product[]>(initialData || [])
    const [loading, setLoading] = useState(false)

    const handleAction = async () => {
        try {
            setLoading(true)
            const produtosSanatizados = produtos.filter((pro) => !!pro.id && !!pro.discountPercentage)
    
            await action(produtosSanatizados)
            
        } catch (error: any) {
            console.log(error)            
        }finally{
            setLoading(false)
        }
    }


    const handleClickPlus = () => {
        if(produtos.map((pro) => pro.id).includes(0)) return
        setProdutos([...produtos, {id: 0, title: "", price: 0, discountPercentage: 0}])
    }

    const handleClickMinus = (id: number) => {
        setProdutos(produtos.filter((pro) => pro.id !== id))
    }

    const handleChange = (item: Product,index: number) => {
        const produtoRepetido = produtos.filter((_,i) => i !== index)
        .map((pro) => pro.id)
        .includes(item.id)
        const produtoZerado = item.id === 0

        if(produtoRepetido && !produtoZerado){
            setProdutos((state) => {
            return state.map((pro,i) => i === index ? { ...item, id:0 } : pro)
        })
            //alert('Produto já adicionado')
            return {newId: 0, newDiscountPercentage: item.discountPercentage || 0}
        }
        
        setProdutos((state) => {
            //console.log(state)
            return state.map((pro,i) => i === index ? item : pro)
        })
    }

    return (
        <div className="w-full flex flex-col items-center gap-5">
            <button>Produtos em Promoção</button>
            {
                produtos.map((produto,i) => {
                    return(
                    <div key={i} 
                        className="bg-white w-sm md:w-2xl flex items-center shadow-md rounded-lg p-4"
                    >
                        <BtnAdicionarProduto index={i} item={produto} onChange={handleChange}/>
                        <button type="button" onClick={() => handleClickMinus(produto.id!) } ><Minus/></button>
                    </div>
                    )
                })  
            }
            <div className="w-sm md:w-2xl flex items-center justify-between">
                <div className="w-1/3 md:w-1/6">
                    <ArrowLeft onClick={() => window.history.back()}/>
                </div>
                <button 
                    className="w-1/3 md:w-1/6" type="button" 
                    onClick={handleClickPlus}
                >
                    <Plus className="mx-auto"/>
                </button>
                <button 
                    className={`w-1/3 md:w-1/6 px-4 rounded-2xl text-white
                        ${produtos.length === 0 || loading ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-500'}`}
                    onClick={handleAction}
                    disabled={produtos.length === 0 || loading}
                >
                    {loading ? (<Loader2 className="animate-spin" />) : 'Salvar'}
                </button>
            </div>
            
        </div>
    )
}

export default Produtos