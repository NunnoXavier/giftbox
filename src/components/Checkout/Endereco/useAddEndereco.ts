import { User } from "@/types/types"
import { useRouter, useSearchParams } from "next/navigation"
import {  useState } from "react"
import { actionSalvarUsuario } from "@/actions/usuarios/actionSalvarUsuario"

const useAddEndereco = (initUser?: User) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const open = searchParams.get('addEnd') === 'open'   
    const [ usuario, setUsuario ] = useState(initUser || null)
   
    const salvar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newUsuario:User = {
            ...usuario as User,
            address: formData.get('endereco') as string,
            city: formData.get('cidade') as string,
            state: formData.get('estado') as string,
            postalCode: formData.get('cep') as string,
            obs: formData.get('complemento') as string,
        }

        const res = await actionSalvarUsuario(newUsuario)
        if(res){
            router.replace('/checkout')
        }
        
    }

    const fechar = async () => {
        router.replace('/checkout')        
    }
    
    return {
        open,
        usuario,
        setUsuario,
        salvar,
        fechar   
    }
}

export default useAddEndereco