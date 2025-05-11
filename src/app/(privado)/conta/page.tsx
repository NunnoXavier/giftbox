import DadosConta from "@/components/DadosConta/DadosConta"
import { User } from "@/types/types"
import { cookies } from "next/headers"

const Conta = async () => {
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
    
    const res = await fetch('http://localhost:3000/api/usuarios', {
        cache: 'no-store',
        headers: {
            Cookie: `SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}`
        }
    })

    const { data:usuario, error }:{data:User, error:string} = await res.json()

    if(!usuario){
        console.log(error)
        return (
            <h1>Ocorreu um erro ao buscar os dados da conta. Tente mais tarde!</h1>
        )
    }
  
    const salvarDados = async (dados:any ) => {
        'use server'

        try {
            const response = await fetch('http://localhost:3000/api/usuarios', {
                method: 'POST',
                headers: {
                    Cookie: `SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}`
                },
                body: JSON.stringify(dados)
            })
            if (response.status !== 200) {
                throw new Error('Erro ao salvar os dados')
            }

            const { data } = await response.json()
            return data
        } catch (error:any) {
            console.log(error.message)
            return false
        }
    }

    return (
        <div className="place-items-center">
            <h1 className="text-xl text-gray-600 font-bold">Conta</h1>
            <DadosConta fnSalvarDados={salvarDados} usuario={usuario}/>
        </div>
    )
}

export default Conta