'use client'
import { Eye, EyeOff } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

const NovaSenha = () => {
    const [ senha, setSenha ] = useState("")
    const [ mostrarSenha, setMostrarSenha ] = useState(false)
    const [ mensagem, setMensagem ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const router = useRouter()
    const params = useSearchParams()
    const token = params.get('token')

    const novaSenha = async () => {
        try {
            setMensagem("")
            setLoading(true)
            const res = await fetch('http://localhost:3000/api/usuarios/nova-senha', {
                method: 'POST',
                headers: { "Content-type": "Application-json" },
                body: JSON.stringify({ token: token, password: senha }),
                cache: "no-cache"
            })
            if(res.status !== 200){
                const data = await res.json()
                setMensagem("erro ao criar nova senha, tente novamente!")
                console.log(data.error)
            }else{
                const { data, error } = await res.json()
                if(!data){
                    setMensagem(error)
                }else{
                    alert("Senha criada com sucesso!")
                    router.push("/dashboard")
                }
            }
        } catch(error:any) {
            setMensagem(error.message)
        }finally{
            setLoading(false)
        }
    }
    return(        
        <div className="bg-white border border-borda rounded-lg p-2 place-center m-auto max-w-96 shadow-md">
            <h1 className="text-xl text-center font-bold text-texto m-4">Nova Senha</h1>
            <div className={`grid grid-cols-12 gap-4 m-2 p-2 max-w-96 mx-auto`}>
                <div className="col-span-12 flex gap-2 items-center border border-borda rounded-md px-2">
                    <input 
                    placeholder="nova senha"
                    type={`${ mostrarSenha? 'text': 'password' }`} id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="p-2  w-full outline-0" />
                    <button className="abcursor-pointer text-texto" 
                    onClick={() => setMostrarSenha(!mostrarSenha)}>
                        {                        
                            mostrarSenha ?
                            < EyeOff />
                            :
                            < Eye/>
                        }
                    </button>
                </div>
                <div className="col-span-12">
                    <button onClick={novaSenha} className="bg-borda2 text-white rounded-md p-2 w-full">
                        Criar nova senha
                    {loading && <span className="loading loading-spinner loading-sm"></span>}
                    </button>
                </div>
                <div className="col-span-12">
                    <p className="text-center text-texto-label">{mensagem}</p>
                </div>
            </div>
        </div>
    )
}

export default NovaSenha