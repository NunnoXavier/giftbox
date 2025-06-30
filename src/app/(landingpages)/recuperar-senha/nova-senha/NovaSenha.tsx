'use client'
import { actionAlterarSenha } from "@/actions/usuarios/actionAlterarSenha"
import Button from "@/components/genericos/Buttons/Button"
import InputPassword from "@/components/genericos/Inputs/InputPassword"
import { validarSenha } from "@/services/validarSenha"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

const NovaSenha = () => {
    const [ mensagem, setMensagem ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()
    const params = useSearchParams()
    const token = params.get('token') as string

    const novaSenha = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setMensagem("")
            setLoading(true)
            const senha = e.currentTarget.senha.value

            const statusSenha = validarSenha(senha)
            
            if(!statusSenha.valido){
                setMensagem(statusSenha.mensagem)
                return
            }            

            const alterouSenha = await actionAlterarSenha( senha, token)
            if(!alterouSenha){
                setMensagem("erro ao criar nova senha, tente novamente!")
                return
            }   

            alert("Senha criada com sucesso!")
            router.push("/dashboard")

        } catch(error:any) {
            console.log("Ocorreu um erro ao criar nova senha! Tente novamente mais tarde.")
            setMensagem(error.message)
        }finally{
            setLoading(false)
        }
    }
    return(        
        <div className="bg-white border border-borda rounded-lg p-2 place-center m-auto w-md shadow-md">
            <h1 className="text-xl text-center font-bold text-texto m-4">Nova Senha</h1>
            <form onSubmit={novaSenha} className={`flex flex-col gap-4 m-2 p-2 max-w-96 mx-auto`}>
                <InputPassword 
                    name="senha"
                    className="p-2  w-full outline-0" 
                />

                <Button type="submit"
                    loading={loading}
                    className="w-full rounded-lg"
                >
                    Criar nova senha                
                </Button>
                <div className="col-span-12">
                    <p className="text-center text-texto-label">{mensagem}</p>
                </div>
            </form>
        </div>
    )
}

export default NovaSenha