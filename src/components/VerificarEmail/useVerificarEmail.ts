'use client'

import { verificarEmailAction } from "@/actions/usuarios/verificarEmailAction";
import { useRouter } from "next/navigation";
import { useState } from "react";

const  useVerificarEmail = () => {
    const [loading, setLoading] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const router = useRouter()

    const verificar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        
        const email = formData.get('email') as string
        const senha = formData.get('senha') as string
        setLoading(true)
        try {
            setMensagem('')
            const result = await verificarEmailAction(email, senha)
            if (result.error) {
                setMensagem(result.error)
                return
            }
            if(result.data === false){
                setMensagem("Email já cadastrado.")
                return
            }

            router.push(`/cadastrar/dados-cadastro?email=${email}&senha=${senha}`)
        } catch (error: any) {
            setMensagem("Ocorreu um erro ao verificar o email. Tente novamente mais tarde.")
            console.log(error.message)

        } finally {
            setLoading(false)
        }    
    }    
  
    return {
        loading,
        setLoading,
        mensagem,
        setMensagem,
        verificar
    }
}

export default useVerificarEmail