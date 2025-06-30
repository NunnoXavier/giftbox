'use client'

import InputText from "@/components/genericos/Inputs/InputText"
import Button from "@/components/genericos/Buttons/Button"
import { useState } from "react"
import { actionRecuperarSenha } from "@/actions/usuarios/actionRecuerarSenha"
import { useRouter } from "next/navigation"
import Link from "next/link"

const FormRecuperarSenha = ({email}: {email?: string}) => {
    const [ mensagem, setMensagem ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const [ sucess, setSucess ] = useState(false)
    const [ error, setError ] = useState(false)    

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setMensagem("")
            setLoading(true)
            const email = e.currentTarget.email.value

            const recuperouSenha = await actionRecuperarSenha(email)
            if(recuperouSenha){
                alert("O link de recuperação de senha foi enviado para o seu email!")
                router.push("/login")
            }else{
                setMensagem("Erro ao enviar email, verifique se o email está correto!")
            }
        } catch(error:any) {
            setMensagem("Ocorreu um erro ao enviar o email, tente novamente!")
            console.log(error.message)
        }finally{
            setLoading(false)
        }            
    }

    return (
        <form onSubmit={handleSubmit} className={`flex flex-col items-center gap-4 p-2 w-full`}>
            <InputText
                type="email"
                className="w-full py-2"
                name="email"
                value={email}
                placeHolder="email. ex: joaodasilva@giftbox.com"
            />
            <Button
                className="w-full rounded-lg"
                type="submit"                            
                loading={loading}
                sucess={sucess} error={error}
                setSucess={setSucess} setError={setError}
            >
                Enviar
            </Button>
            <div className="text-center mt-2">
                <Link href="/login"  className="text-texto-link hover:underline">
                    Voltar para o login
                </Link>
            </div>
            <div className="col-span-12">
                {mensagem && <div className="text-texto-alerta">{mensagem}</div>}
            </div>
        </form>        
    )
}

export default FormRecuperarSenha