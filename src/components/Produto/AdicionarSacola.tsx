'use client'

import { ProductCart } from "@/types/types"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import { fetchAddItem } from "../Store/SacolaStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const AdicionarSacola = ({itemSacola}:{itemSacola:ProductCart}) => {
    const [qtde, setQtde] = useState("1")
    const queryClient = useQueryClient()

    const { mutateAsync:additem } = useMutation({
        mutationFn: fetchAddItem,
        mutationKey: ['sacola'],
        onSuccess: (_, variables) => {
            queryClient.setQueryData<ProductCart[]>(['sacola'], (data) => {       
                return data? [
                    ...data,
                    { ...variables }
                ]: []
            })
        }
    })

    const adicionarSacola = async () => {
        const novoItem:ProductCart = {
            id: itemSacola.id,
            title: itemSacola.title || "",
            idProduct: itemSacola.idProduct,
            qtde: Number(qtde),
            price: itemSacola.price,
            discountPercentage: itemSacola.discountPercentage,
            thumbnail: itemSacola.thumbnail
        }
        
        const result = await additem(novoItem)
        if(!result){
            throw new Error('erro ao adicionar produto na sacola')
        }        
    }

    return (
        <div className="bg-white flex gap-2">
            <input 
                className=" bg-gray-100 outline-0 px-2 text-center appearance-none caret-violet-400 text-violet-400 focus:border focus:border-violet-400 w-14 h-14 rounded-lg" 
                type="number"
                value={qtde}
                onChange={(e) => setQtde(e.currentTarget.value) }
            />
            <button  
                className="flex-1 flex gap-2 justify-center place-items-center bg-violet-400 text-white px-5 rounded-xl"
                onClick={adicionarSacola}
                
            >
                <ShoppingBag /> Adicionar à Sacola
            </button>
        </div>        
    )
}

export default AdicionarSacola