'use client'

import { LoaderCircle, Undo2 } from "lucide-react"
import InputDate from "../genericos/Inputs/InputDate"
import InputText from "../genericos/Inputs/InputText"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { actionEnviarEmail } from "@/actions/usuarios/actionEnviarEmail"

export type UserDto = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    birthday: Date,
    role: string
}

type FDCadastroProps = {
    action: ( { email, password,firstName,lastName,birthday,role }: UserDto ) => Promise<{token: string}>
}

const FormDadosCadastro = ({ action }: FDCadastroProps) => {
    const [loading, setLoading] = useState(false)
    const [mensagem, setMensagem] = useState('')

    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const senha = searchParams.get('senha')

    if(!email || !senha) {
        return (
            <section className="flex flex-col gap-4">
                <div>Erro ao carregar os dados</div>
                <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500"
                    onClick={() => router.back()}
                >
                    <Undo2 />
                    Voltar
                </button>
            </section>

        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {           
            e.preventDefault()
            setLoading(true)
            setMensagem('')
            const formData = new FormData(e.currentTarget)
            const nome = formData.get('nome') as string
            const sobrenome = formData.get('sobrenome') as string
            const nascimento = formData.get('nascimento') as string

            const user: UserDto = {
                email: email,
                password: senha,
                firstName: nome,
                lastName: sobrenome,
                birthday: new Date(nascimento),
                role: 'client'
            }
            
            const res = await action(user)
            if(!res){
                setMensagem("Ocorreu um erro ao cadastrar o usuário, tente mais tarde.")
            }

            const resCookieToken = await fetch(`http://localhost:3000/api/usuarios/token`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token: res.token})
            })

            if(resCookieToken.status !== 200) {
                setMensagem("Ocorreu um erro ao receber  o token, tente mais tarde.")
                return
            }            
            
            router.push('/confirmar-cadastro')

            
        } catch (error: any) {
            setMensagem("Ocorreu um erro ao cadastrar o usuário, tente mais tarde.")
            console.log(error.message)
        } finally {
            setLoading(false)
        }        
    }


    return (
        <form  onSubmit={handleSubmit} className="flex flex-col gap-4 m-2 p-2 max-w-96 mx-auto">
            <div className="w-full">                    
                <InputText
                    className="w-full px-4 py-2 text-texto-label bg-borda"
                    type="text" name="email"
                    disabled={true}
                    value={email}
                />
            </div>
            <div className="w-full">                    
                <InputText
                    className="w-full px-4 py-2 text-texto-label bg-borda"
                    type="password" name="senha"
                    disabled={true}
                    value={senha}
                />
            </div>
            <div className="w-full">                    
                <InputText
                    placeHolder="nome. ex: João"  
                    className="w-full px-4 py-2"
                    type="text" name="nome"
                />
            </div>
            <div className="w-full">                    
                <InputText
                    placeHolder="sobrenome. ex: da Silva"  
                    type="text" name="sobrenome" 
                    className="w-full px-4 py-2"
                />
            </div>
            <div className="w-full">                    
                <InputDate
                    name="nascimento" 
                    className="w-full px-4 py-2"
                />
            </div>
            <div className="w-full text-center">                    
                <button
                    type="submit" 
                    className="w-full relative bg-borda2 text-white rounded-lg h-10"
                >
                    <span className='text-center inline-block'>Cadastrar</span>
                    <LoaderCircle className={`absolute top-1/4 right-1/6 animate-spin ${ loading? 'block' : 'hidden' }`}/>
                </button>
            </div>                    
            <div className="w-full text-center">
                {mensagem}
            </div>
        </form>
  )
}

export default FormDadosCadastro