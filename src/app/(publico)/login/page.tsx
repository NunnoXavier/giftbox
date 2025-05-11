'use client'
import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

const Login = () => {
    const [ loading, setLoading ] = useState(false)
    const [ mensagem, setMensagem ] = useState("")
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("") 
    
    const verificar = async () => {
        try {
            setMensagem("")
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/usuarios/login', {
                method: 'POST',
                headers: { "Content-type": "Application-json" },
                body: JSON.stringify({ email: email, password: senha }),
                cache: "no-cache"
            })

            if(res.status !== 200){ 
                const data = await res.json()
                setMensagem(data.error)    
            }else{
                const { data, error } = await res.json()
                if(!data){
                    setMensagem(error)
                }else{
                    router.push("/dashboard")
                }
            }
        } catch (error:any) {
            setMensagem(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-2 place-center m-auto max-w-96 ">
            <h1 className="text-xl text-center font-bold text-gray-700 m-4">Login</h1>

            <div className={`grid grid-cols-12 gap-4 m-2 p-2 max-w-96 mx-auto`}>
                <div className="col-span-12">
                    <input
                        placeholder="email. ex: joaodasilva@giftbox.com" 
                        type="email" id="email" 
                        className="w-full border border-gray-200 focus:border-violet-400 rounded-lg text-gray-700 caret-gray-700 px-2"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className="col-span-12">                    
                    <input
                        placeholder="senha"  
                        type="password" id="senha" 
                        className="w-full border border-gray-200 focus:border-violet-400 rounded-lg text-gray-700 caret-gray-700 px-2"
                        value={senha}
                        onChange={(e) => setSenha(e.currentTarget.value)}                            
                    />
                </div>
                <div className="col-span-12 text-center">                    
                    <button className="w-full relative bg-violet-400 text-white rounded-lg h-10"
                        onClick={() => verificar()}
                    >
                        <span className='text-center inline-block'>Entrar</span>
                        <LoaderCircle className={`absolute top-1/4 right-1/6 animate-spin ${ loading? 'block' : 'hidden' }`}/>

                    </button>                    
                </div>
                <div className="col-span-12">
                    <Link href="/recuperar-senha" className="text-blue-500 text-sm hover:underline">Esqueci minha senha</Link>
                </div>
                <div className="col-span-12 text-center">                    
                    <span className='text-center inline-block'>{mensagem}</span>
                </div>

            </div>
        </div>
    )
}

export default Login