'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const RecuperarSenha = () => {
    const [ email, setEmail ] = useState("")
    const [ mensagem, setMensagem ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()      
    
    const recuperarSenha = async () => {
        try {
            setMensagem("")
            setLoading(true)

            const res = await fetch('http://localhost:3000/api/usuarios/recuperar-senha', {
                method: 'POST',
                headers: { "Content-type": "Application-json" },
                body: JSON.stringify({ email: email }),
                cache: "no-cache"
            })

            if(res.status !== 200){
                setMensagem("erro ao enviar email, verifique se o email está correto!")
            }else{
                const { data:dataEmail, error:errorEmail } = await res.json()
                if(!dataEmail){
                    setMensagem(errorEmail)
                }else{
                    alert("O link de recuperação de senha foi enviado para o seu email!")
                    router.push("/login")
                }
            }
        } catch(error:any) {
            setMensagem(error.message)
        }finally{
            setLoading(false)
        }
    }

    return(
    <div className="bg-white border border-gray-200 rounded-lg p-2 place-center m-auto max-w-96 ">
        <h1 className="text-xl text-center font-bold text-gray-700 m-4">Recuperar Senha</h1>
        <div className={`grid grid-cols-12 gap-4 m-2 p-2 max-w-96 mx-auto`}>
            <div className="col-span-12">
                <input
                    placeholder="email. ex: joaodasilva@giftbox.com"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="col-span-12">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full"
                    onClick={recuperarSenha}
                    disabled={loading}
                >
                    {loading ? "Enviando..." : "Enviar"}
                </button>
                <div className="text-center mt-2">
                    <Link href="/login"  className="text-blue-500 hover:underline">
                        Voltar para o login
                    </Link>
                </div>
            </div>
        <div className="col-span-12">
            {mensagem && <div className="text-red-500">{mensagem}</div>}
            </div>
        </div>
    </div>
    
    )
}
    
export default RecuperarSenha
