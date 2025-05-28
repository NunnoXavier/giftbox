'use client'
import { ShoppingBag } from "lucide-react"
import { fetchAddItem } from "@/components/Store/SacolaStore"
import { Product, ProductCart } from "@/types/types"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type BtnAddSacolaProps = {
    className?: string,
    produto?: Product
}

const BtnAddSacola = ({ produto, className }:BtnAddSacolaProps) => {
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
   
    return (
        <button 
            className={`${className} text-xs w-40 flex place-content-center bg-borda2 text-white px-2 py-1 rounded-xl`}
            onClick={() => addSacola({ 
                id: 0,
                title: produto?.title || "", 
                idProduct: produto?.id || 0, 
                qtde: 1, 
                price: produto?.price || 0,
                discountPercentage: produto?.discountPercentage || 0,
                thumbnail: produto?.thumbnail
            })}
        >
            <ShoppingBag className="mr-2" size={15}/> 
            Adicionar à sacola
    </button>        
    )
}

export default BtnAddSacola