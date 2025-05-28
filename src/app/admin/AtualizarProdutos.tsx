'use client'

import { actionRevalidarEstoque } from "@/actions/produtos/actionRevalidarEstoque"
import { actionRevalidarPreco } from "@/actions/produtos/actionRevalidarPreco"
import { actionRevalidarProdutos } from "@/actions/produtos/actionRevalidarProdutos"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const AtualizarProdutos = () => {
    const [  isLoading, setIsLoading ] = useState(false)

    const handleClick = async () => {
        try {
            setIsLoading(true)
            actionRevalidarProdutos()
            actionRevalidarEstoque()
            actionRevalidarPreco()            
            
        } catch (error) {
            
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <button 
            className="bg-texto2 hover:bg-borda2 text-white p-4 rounded-3xl"
            onClick={handleClick}
        >
            {
                isLoading ? 
                (
                    <Loader2 className="animate-spin" />
                ) 
                : 'Atualizar Produtos'
                
            }
        </button>        
    )
}

export default AtualizarProdutos