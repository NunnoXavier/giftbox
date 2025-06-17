'use client'

import { LoaderCircle, Undo2 } from "lucide-react"
import InputDate from "../genericos/Inputs/InputDate"
import InputText from "../genericos/Inputs/InputText"
import useFormDadosCadastro from "./useDadosCadastro"

const FormDadosCadastro = () => {
    
    const dados = useFormDadosCadastro()

    if(!dados.email || !dados.senha) {
        return (
            <section className="flex flex-col gap-4">
                <div>Erro ao carregar os dados</div>
                <button 
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500"
                    onClick={() => dados.router.back()}
                >
                    <Undo2 />
                    Voltar
                </button>
            </section>

        )
    }

    return (
        <form  onSubmit={dados.handleSubmit} className="flex flex-col gap-4 m-2 p-2 max-w-96 mx-auto">
            <div className="w-full">                    
                <InputText
                    className="w-full px-4 py-2 text-texto-label bg-borda"
                    type="text" name="email"
                    disabled={true}
                    value={dados.email}
                />
            </div>
            <div className="w-full">                    
                <InputText
                    className="w-full px-4 py-2 text-texto-label bg-borda"
                    type="password" name="senha"
                    disabled={true}
                    value={dados.senha}
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
                    <LoaderCircle className={`absolute top-1/4 right-1/6 animate-spin ${ dados.loading? 'block' : 'hidden' }`}/>
                </button>
            </div>                    
            <div className="w-full text-center">
                {dados.mensagem}
            </div>
        </form>
  )
}

export default FormDadosCadastro