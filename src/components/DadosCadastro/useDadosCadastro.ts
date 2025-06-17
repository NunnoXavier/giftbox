'use  client'

import { actionCadastrarUsuario } from "@/actions/usuarios/actionCadastrarUsuario"
import { setCookieToken } from "@/hooks/setCookieToken"
import { User } from "@/types/types"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"

const useFormDadosCadastro = () => {
    const [loading, setLoading] = useState(false)
    const [mensagem, setMensagem] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const senha = searchParams.get('senha')    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {           
            e.preventDefault()
            setLoading(true)
            setMensagem('')
            const formData = new FormData(e.currentTarget)
            const nome = formData.get('nome') as string
            const sobrenome = formData.get('sobrenome') as string
            const nascimento = formData.get('nascimento') as string

            const user: User = {
                email: email as string,
                password: senha as string,
                firstName: nome,
                lastName: sobrenome,
                birthday: new Date(nascimento),
                role: 'client'
            }
            
            const res = await actionCadastrarUsuario(user)
            if(!res){
                setMensagem("Ocorreu um erro ao cadastrar o usuário, tente mais tarde.")
            }

            await setCookieToken(res.token)
            
            router.push('/confirmar-cadastro')
            
        } catch (error: any) {
            setMensagem("Ocorreu um erro ao cadastrar o usuário, tente mais tarde.")
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
        handleSubmit,
        email,
        senha,
        router
    }
}

export default useFormDadosCadastro