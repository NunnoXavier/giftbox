'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchRemoveAllItems } from "../Store/SacolaStore"

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
            <button className="w-40 bg-texto-alerta text-white text-sm rounded-full ml-2"
                onClick={() => mutateEsvaziarSacola()}>
                esvaziar sacola
            </button>
        </div>        
    )
}

export default BtnEsvaziarSaola