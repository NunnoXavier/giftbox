'use client'
import { ShoppingBag } from "lucide-react"
import { fetchAddItem } from "../../localCache/SacolaStore"
import { Product, ProductCart } from "@/types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

type BtnAddSacolaProps = {
    className?: string,
    produto?: Product,
    disponivel?: boolean
}

const BtnAddSacola = ({ produto, className, disponivel }:BtnAddSacolaProps) => {
    const [sucess, setSucess] = useState(false)

    useEffect(() => {
        if(sucess) {
            setTimeout(() => {
                setSucess(false)
            }, 1000)
        }
    }, [sucess])

    const queryClient = useQueryClient()
    
    const { mutateAsync:addSacola } = useMutation({
        mutationFn: fetchAddItem,
        mutationKey: ['sacola'],
        onSuccess: (_, variables) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], data => {
                return data? [ ...data, { ...variables } ] : [{ ...variables }]
            })
        }
    })
   
    const handleClick = () => {
        addSacola({ 
                id: 0,
                title: produto?.title || "", 
                idProduct: produto?.id || 0, 
                qtde: 1, 
                price: produto?.price || 0,
                discountPercentage: produto?.discountPercentage || 0,
                thumbnail: produto?.thumbnail
            })
        setSucess(true)
    }

    return (
        <button 
            className={`${className} text-xs w-40 flex place-content-center 
             hover:bg-borda2 bg-violet-500 text-white px-2 py-1 rounded-xl
             ${sucess? 'animate-ping' : ''}`}
            onClick={ handleClick }
            disabled={!disponivel}
        >
            <ShoppingBag className="mr-2" size={15}/>
            {
                disponivel? 'Adicionar à sacola' : 'Produto esgotado'
            } 
    </button>        
    )
}

export default BtnAddSacola