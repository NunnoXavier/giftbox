'use client'

import { ProductCart } from "@/types/types"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import { fetchAddItem } from "../../localCache/SacolaStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const AdicionarSacola = ({itemSacola, className}:{itemSacola:ProductCart, className?:string}) => {
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
        <div className={`${className} bg-white flex gap-2`}>
            <input 
                className=" bg-background outline-0 px-2 text-center appearance-none caret-borda2 text-texto2 focus:border focus:border-borda2 w-14 h-14 rounded-lg" 
                type="number"
                value={qtde}
                onChange={(e) => setQtde(e.currentTarget.value) }
            />
            <button  
                className="flex-1 flex gap-2 justify-center place-items-center bg-texto2 hover:bg-borda2 text-white px-5 rounded-xl"
                onClick={adicionarSacola}
                
            >
                <ShoppingBag /> Adicionar à Sacola
            </button>
        </div>        
    )
}

export default AdicionarSacola