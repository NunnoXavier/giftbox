'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchRemoveAllItems } from "../../localCache/SacolaStore"

const BtnEsvaziarSaola = () => {
    const queryClient = useQueryClient()

    const { mutate:mutateEsvaziarSacola } = useMutation({
        mutationFn: fetchRemoveAllItems,
        mutationKey: ['esvaziar-sacola'],
        onSuccess: () => {
            queryClient.setQueryData<[]>(['sacola'], data => [] )
        }
    })

    return (
        <div className="flex">
            <button className="bg-texto-alerta hover:bg-borda-alerta text-white text-sm rounded-full px-4 py-2 ml-2"
                onClick={() => mutateEsvaziarSacola()}>
                esvaziar
            </button>
        </div>        
    )
}

export default BtnEsvaziarSaola