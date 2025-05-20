'use client'

import { verificarEmailAction } from '@/actions/usuarios/verificarEmailAction'
import { User } from '@/types/types'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const Cadastrar = () => {
    const [ loading, setLoading ] = useState(false)
    const [ mensagem, setMensagem ] = useState("")
    const [ verificado, setVerificado ] = useState(false)
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [ mostrarSenha, setMostrarSenha ] = useState(false)
    const [nome, setNome] = useState("")
    const [sobrenome, setSobrenome] = useState("")
    const [nascimento, setNascimento] = useState("")
    const router = useRouter()

    const verificarEmail = async () => {
        setLoading(true)
        try {
            setMensagem('')
            const verificou = await verificarEmailAction(email, senha)
            if(verificou){
                setVerificado(true)
            } else {
                setMensagem('Email já cadastrado')
            }
        } catch(error:any) {
            setMensagem('ocorreu um erro na validação do email')         
            setMensagem(error.message)         
        } finally {
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
                birthday: new Date(nascimento),
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
        <div className="bg-transparent min-h-screen flex flex-col justify-center items-center p-10 text-center">
            <div className="bg-white border border-borda rounded-lg p-8 text-center place-center w-md shadow-md">
                <h1 className="text-xl text-texto m-2 font-bold">{ verificado?'CADASTRO':'VERIFICAR EMAIL' }</h1>

                <div>
                    <div className={`${verificado? 'hidden': ''} grid grid-cols-12 gap-4 m-2 p-2 max-w-96 mx-auto`}>
                        <div className="col-span-12 border border-borda focus:border-borda2 rounded-lg text-texto px-2">
                            <input
                                placeholder="email" 
                                type="email" id="email"
                                className="w-full  caret-texto px-4 py-2"
                                value={email}
                                onChange={(e) => setEmail(e.currentTarget.value)}
                            />
                        </div>
                        <div className="col-span-12 flex gap-2 border border-borda focus:border-borda2 rounded-lg text-texto px-2">                    
                            <input
                                placeholder="senha"  
                                type={`${ mostrarSenha? 'text':'password' }`} id="senha" 
                                className="w-full   caret-texto px-4 py-2"
                                value={senha}
                                onChange={(e) => setSenha(e.currentTarget.value)}                            
                            />
                            <button onClick={() => setMostrarSenha(!mostrarSenha)}>
                                {
                                    mostrarSenha?
                                    (
                                        <EyeOff className="text-texto-label"/>
                                    )
                                    :
                                    (
                                        <Eye className="text-texto-label"/>
                                    )
                                }
                            </button>
                        </div>
                        <div className="col-span-12 text-center">                    
                            <button className="w-full relative bg-texto2 text-white rounded-lg h-10"
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
                                className="w-full border border-borda focus:border-borda2 rounded-lg text-texto caret-texto px-4 py-2"
                                type="text" id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.currentTarget.value)} 
                            />
                        </div>
                        <div className="col-span-12">                    
                            <input
                                placeholder="sobrenome. ex: da Silva"  
                                type="text" id="sobrenome" 
                                className="w-full border border-borda focus:border-borda2 rounded-lg text-texto caret-texto px-4 py-2"
                                value={sobrenome}
                                onChange={(e) => setSobrenome(e.currentTarget.value)}
                            />
                        </div>
                        <div className="col-span-12">                    
                            <input
                                placeholder="Data de Nascimento. Ex: 23/01/1984"  
                                type="date" id="nascimento" 
                                className="w-full border border-borda focus:border-borda2 rounded-lg text-texto caret-texto px-4 py-2"
                                value={nascimento}
                                onChange={(e) => setNascimento(e.currentTarget.value)}
                            />
                        </div>
                        <div className="col-span-12 text-center">                    
                            <button className="w-full relative bg-borda2 text-white rounded-lg h-10"
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
        </div>
    )
}

export default Cadastrar