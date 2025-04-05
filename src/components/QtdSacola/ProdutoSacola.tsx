'use client'
import { PlusCircle, MinusCircle, Trash } from 'lucide-react'
import { ProductCart } from '@/types/types'

import { useState } from 'react'

export type TProdutoSacola = {
    pos: number,
    qtde: number,
    id: number,
    title: string,
    thumbnail: string,
    price: number,
    discountPercentage: number
}



export type QtdSacolaProps = {
    className?: string,
    produto: TProdutoSacola
}

const initProdutoSacola:ProductCart = {
    idProduct: 0,
    idUser: 0,
    qtde: 0,
}

const ProdutoSacola = ({ className, produto }:QtdSacolaProps) => {
    const [ produtoSacola, setProdutoSacola ] = useState<TProdutoSacola | undefined>(produto)

    if(!produtoSacola){
        return
    }

    const addQtd = () => {
        setProdutoSacola((p) => {
            if(!p) return
            if(p.qtde < 99){
                return {
                    ...p,
                    qtde: p.qtde + 1
                }
            }else{
                return p
            }
        })
    }
    const subQtd = () => {        
        setProdutoSacola((p) => {
            if(!p) return            
            if(p.qtde > 0){
                return {
                    ...p,
                    qtde: p.qtde - 1
                }
            }else{
                return p
            }
        })
    }

    
    const apagar = async () => {
        const res = await fetch('http://localhost:3000/api/usuarios/sacola', {
            method: 'DELETE',
            body: JSON.stringify(produtoSacola)
        })

        const { data, error } = await res.json()

        if(!data){
            console.log(error)
        }else{
            setProdutoSacola( undefined )
        }

    }

    return (
        <div key={produtoSacola.pos} className="grid grid-cols-24 gap-2 p-2">
            <div className="col-span-4 flex justify-center items-center">
                {
                    !produtoSacola.thumbnail || produtoSacola.thumbnail === ''?
                    (<img src={'/images/placeholder.jpeg'} alt="" />)                                    
                    :(<img src={produtoSacola.thumbnail} alt="" />)
                }
            </div>
            <div className="col-span-8 flex justify-center items-center">
                <span>{produtoSacola.title}</span>
            </div>
            <div className="col-span-3 flex justify-center items-center">
                <div className="flex justify-center items-center gap-1">
                    <MinusCircle className="text-gray-400 hover:text-gray-600" size={15} onClick={subQtd}/>
                    <span className="border border-gray-300 px-2 rounded-sm">{produtoSacola.qtde}</span>
                    <PlusCircle className="text-gray-400 hover:text-gray-600" size={15} onClick={addQtd} />
                    <Trash className={`${ produtoSacola.qtde === 0? 'block':'hidden' } text-red-500`} size={15} fill='#fb2c36' onClick={apagar} />
                </div>                                        
            </div>

            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{produtoSacola.price?.toFixed(2)}</span>
            </div>
            <div className="col-span-4 flex justify-center items-center">
                <span className="text-right">{produtoSacola.discountPercentage?.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default ProdutoSacola