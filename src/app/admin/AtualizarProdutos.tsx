'use client'

import { atualizarProdutosAction } from "@/actions/produtos/atualizarProdutosAction"
import { Loader2 } from "lucide-react"
import { useState } from "react"

const AtualizarProdutos = () => {
    const [  isLoading, setIsLoading ] = useState(false)

    const handleClick = async () => {
        try {
            setIsLoading(true)
            atualizarProdutosAction()
            
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