'use client'

import InputText from "../genericos/Inputs/InputText"
import { LoaderCircle } from "lucide-react"
import InputPassword from "../genericos/Inputs/InputPassword"
import useVerificarEmail from "./useVerificarEmail"

const FormVerificarEmail = () => {

    const dados = useVerificarEmail()

    return (
        <form 
            onSubmit={dados.verificar}
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
                    <LoaderCircle className={`absolute top-1/4 right-1/6 animate-spin ${ dados.loading? 'block' : 'hidden' }`}/>

                </button>
            </div>
            <div className="w-full text-center">
                {dados.mensagem}
            </div>
        </form>        
    )
}

export default FormVerificarEmail