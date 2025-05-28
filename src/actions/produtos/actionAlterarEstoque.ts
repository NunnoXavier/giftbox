'use server'

import { Product } from "@/types/types"

export const actionAlterarEstoque = async ({ id, qtde }: 
{ id: number, qtde: number }) => {

    try {
        const res = await fetch('http://localhost:3000/api/produtos/estoque',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                qtde
            })
        })
    
        if (!res.ok) {
            throw new Error('Erro ao alterar estoque')
        }
    
        const { data, error }:{ data:Product, error:string }  = await res.json()
        if (!data) {
            console.log(error)
            throw new Error(error)
        }
    
        return data
        
    } catch (error:any) {
        console.log(error.message)
        throw new Error(error.message)
    }    
}