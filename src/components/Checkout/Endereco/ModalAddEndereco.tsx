'use client'
import Modal from "@/components/Modal/Modal"
import { useSearchParams, useRouter } from "next/navigation"
import { createQueryUsuario, updateUsuario } from "@/components/Store/UsuarioStore"
import { User } from "@/types/types"
import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LoaderIcon as IconeEspera } from 'lucide-react'

const initUser: User = {
    id: 0,
    email: "",
    role: "client",
    address: "",
    cardExpire: "",
    cardNumber: "",
    city: "",
    firstName: "",
    lastName: "",
    phone: "",
    postalCode: "",
    state: "",
    username: "",
}


const ModalAddEndereco = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const open = searchParams.get('addEnd') === 'open'   
    const [ usuario, setUsuario ] = useState(initUser)
    const queryClient = useQueryClient()
    
    const { data, error, isError, isLoading } = createQueryUsuario()

    const { mutateAsync:altUsuario } = useMutation({
        mutationKey: ['usuario'],
        mutationFn: updateUsuario,
        onSuccess: (_, variables) => {
            queryClient.setQueryData<User>(['usuario'], data => {
                return {
                    ...variables
                }
            })
        }
    })
    
    const salvar = async () => {
        const res = await altUsuario(usuario)
        if(res){
            router.replace('/checkout')
        }
        
    }

    const fechar = async () => {
        router.replace('/checkout')        
    }
    
    useEffect(() => {
        if(!data){
            return
        }       
    
        setUsuario(data)
    },[data])
    
    const Buttons = () => {
    return (
            <div className="flex justify-end text-sm gap-3">
                <button 
                    className="border border-gray-300 rounded-full px-3 py-1"
                    onClick={fechar}
                >
                        Fechar
                    </button>
                <button 
                    className="border border-gray-300 rounded-full bg-violet-600 text-white px-3 py-1"
                    onClick={salvar}
                >
                    Salvar instruções
                </button>
            </div>
        )
    }
    
    if(isLoading){
        return (
            <IconeEspera className="animate-spin" size={15}/>
        )
    }

    if(isError){
        console.log(error)
        return
    }
   
    return (
        <Modal 
            show={open}
            buttons={Buttons()}
            title="Instruções de Entrega"
            type="none"
        >
            <div className="flex flex-col gap-2">
                <div className="w-full">
                    <span>Endereço de entrega</span>
                    <input 
                        type="text" 
                        className="border border-gray-200 rounded-md w-full px-2"
                        placeholder="Ex: Rua Oscar Freire, 2000"
                        value={usuario?.address || ""}
                        onChange={(e) => setUsuario({ ...usuario, address: e.currentTarget?.value })}
                    />
                </div>
                <div className="w-full">
                    <span>Cidade / UF</span>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md w-5/6 px-2"
                            placeholder="Ex: São Paulo"
                            value={usuario?.city || ""}
                            onChange={(e) => setUsuario({ ...usuario, city: e.currentTarget?.value })}
                            />
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md w-1/6 px-2"
                            placeholder="Ex: SP"
                            value={usuario?.state || ""}
                            onChange={(e) => setUsuario({ ...usuario, state: e.currentTarget?.value })}
                            />
                    </div>
                </div>
                <div className="w-full">
                    <span>CEP / Complemento</span>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md w-2/6 px-2"
                            placeholder="Ex: 05037001"
                            value={usuario?.postalCode || ""}
                            onChange={(e) => setUsuario({ ...usuario, postalCode: e.currentTarget?.value })}
                            />
                        <input 
                            type="text" 
                            className="border border-gray-200 rounded-md w-4/6 px-2"
                            placeholder='Ex: "Apto 120" ou "terreo/fundos"'
                            value={usuario?.obs || ""}
                            onChange={(e) => setUsuario({ ...usuario, obs: e.currentTarget?.value })}
                        />
                    </div>
                </div>
            </div>
        </Modal>    
    )
}


export default ModalAddEndereco