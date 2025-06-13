'use client'

import { useState } from "react"
import InputText from "../genericos/Inputs/InputText"
import { LoaderCircle } from "lucide-react"
import { verificarEmailAction } from "@/actions/usuarios/verificarEmailAction"
import { useRouter } from "next/navigation"
import InputPassword from "../genericos/Inputs/InputPassword"


const FormVerificarEmail = () => {

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

    return (
        <form 
            onSubmit={verificar}
            className="flex flex-col gap-4 m-2 p-2 max-w-96 mx-auto"
        >
            <div className="col-span-12 px-2">
                <InputText
                    placeHolder="email" 
                    type="email" name="email"
                    className="w-full  caret-texto px-4 py-2"
                />
            </div>
            <div className="col-span-12 flex gap-2 px-2">                    
                <InputPassword
                    placeHolder="senha"  
                    name="senha" 
                    className="w-full   caret-texto px-4 py-2"
                />
            </div>
            <div className="col-span-12 text-center">                    
                <button 
                    type="submit"
                    className="w-full relative bg-texto2 text-white rounded-lg h-10"
                >
                    <span className='text-center inline-block'>verificar e-mail e senha</span>
                    <LoaderCircle className={`absolute top-1/4 right-1/6 animate-spin ${ loading? 'block' : 'hidden' }`}/>

                </button>
            </div>
            <div className="w-full text-center">
                {mensagem}
            </div>
        </form>        
    )
}

export default FormVerificarEmail