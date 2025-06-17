'use client'

import { actionLogin } from "@/actions/usuarios/actionLogin";
import { setCookieToken } from "@/hooks/setCookieToken";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useVerificarEmail = () => {
    const [loading, setLoading] = useState(false)
    const [mensagem, setMensagem] = useState("")    
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setMensagem("")
            setLoading(true)
            sessionStorage.clear() // Limpa o cache do navegador

            const formData  = new FormData(e.target as HTMLFormElement)

            const email = formData.get("email") as string
            const senha = formData.get("senha") as string

            const token = await actionLogin(email, senha)
            if(!token){
                setMensagem("Erro ao fazer login")
                return
            }

            await setCookieToken(token)
            router.push('/dashboard')
        
        } catch (error: any) {
            setMensagem(error.message)
        } finally {
            setLoading(false)
        }
    }      
  
    return {
        handleSubmit,
        loading,
        mensagem
    }
}

export default useVerificarEmail