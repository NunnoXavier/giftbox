'use client'

import { User } from '@/types/types'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const Cadastrar = () => {
    const [ loading, setLoading ] = useState(false)
    const [ mensagem, setMensagem ] = useState("")
    const [ verificado, setVerificado ] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const router = useRouter()

    const verificarEmail = async () => {
        function validarEmail(email:string) {
            const padraoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            return padraoEmail.test(email)
        }        

        try {
            setLoading(true)
            setMensagem("")
            if(!validarEmail(email)){
                throw new Error('Email inválido')
            }

            if(senha.length < 6){
                throw new Error('A senha deve conter ao menos 6 caracteres, entre letras, números e símbolos!')
            }

            const res = await fetch(`http://localhost:3000/api/usuarios/verificar-email/${email}`)
            const { data, error }:{ data:boolean, error:string } = await res.json()
            if(error){
                throw new Error(error)
            }

            if(data){
                setVerificado(true)
            }else{
                setVerificado(false)
                setMensagem('Email já cadastrado!')
            }
        } catch (error:any) {
            setMensagem(error.message)
            setVerificado(false)
        }finally{
            setLoading(false)
        }
    }

    const cadastrar = async () => {
        try {
            setMensagem("")
            setLoading(true)
            const usuario: User = {
                email: email,
                password: senha,
                firstName: nome,
                lastName: sobrenome,
                role: 'client'
            }
            
            const res = await fetch(`http://localhost:3000/api/usuarios/cadastrar`,  { 
                method: 'PUT',
                headers: {
                    "Content-type": "Application-json"
                },
                body: JSON.stringify(usuario),
                cache: "no-cache"
            })
            
            const {data, error} = await res.json()
            if(!data){
                throw new Error(error)
            }
            usuario.id = data.id
    
            router.push("/dashboard")
            
        } catch (error:any) {
            console.log(error.message)
            setMensagem(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-2 text-center place-center m-auto max-w-96">
            <h1 className="text-xl text-gray-700 m-2 font-bold">CADASTRO</h1>

            <div>
                <div className={`${verificado? 'hidden': ''} grid grid-cols-12 gap-4 m-2 p-2 max-w-96 mx-auto`}>
                    <div className="col-span-12">
                        <input
                            placeholder="email. ex: joaodasilva@giftbox.com" 
                            type="email" id="email"
                            className="w-full  border border-gray-200 focus:border-violet-400 rounded-lg text-gray-700 caret-gray-700 px-2"
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                        />
                    </div>
                    <div className="col-span-12">                    
                        <input
                            placeholder="senha. escolha uma senha com ao menos 6 digitos"  
                            type="password" id="senha" 
                            className="w-full border border-gray-200 focus:border-violet-400 rounded-lg text-gray-700 caret-gray-700 px-2"
                            value={senha}
                            onChange={(e) => setSenha(e.currentTarget.value)}                            
                        />
                    </div>
                    <div className="col-span-12 text-center">                    
                        <button className="w-full relative bg-violet-400 text-white rounded-lg h-10"
                            onClick={() => verificarEmail()}
                        >
                            <span className='text-center inline-block'>verificar e-mail e senha</span>
                            <LoaderCircle className={`absolute top-1/4 right-1/6 animate-spin ${ loading? 'block' : 'hidden' }`}/>

                        </button>
                    </div>
                </div>

                <div className={`${!verificado? 'hidden': ''} grid grid-cols-12 gap-4 m-2 p-2 max-w-96 mx-auto`}>
                    <div className="col-span-12">                    
                        <input
                            placeholder="nome. ex: João"  
                            className="w-full border border-gray-200 focus:border-violet-400 rounded-lg text-gray-700 caret-gray-700 px-2"
                            type="text" id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.currentTarget.value)} 
                        />
                    </div>
                    <div className="col-span-12">                    
                        <input
                            placeholder="sobrenome. ex: da Silva"  
                            type="text" id="sobrenome" 
                            className="w-full border border-gray-200 focus:border-violet-400 rounded-lg text-gray-700 caret-gray-700 px-2"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.currentTarget.value)}
                        />
                    </div>
                    <div className="col-span-12 text-center">                    
                        <button className="w-full relative bg-violet-400 text-white rounded-lg h-10"
                            onClick={() => cadastrar()}
                        >
                            <span className='text-center inline-block'>Cadastrar</span>
                            <LoaderCircle className={`absolute top-1/4 right-1/6 animate-spin ${ loading? 'block' : 'hidden' }`}/>

                        </button>
                    </div>                    
                </div>
                <div>
                    {mensagem}
                </div>

            </div>
        </div>
    )
}

export default Cadastrar