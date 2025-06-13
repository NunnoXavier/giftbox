import { User } from "@/types/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const createQueryUsuario = () => {
    const fetchUsuario = async():Promise<User> => {
        const res = await fetch('http://localhost:3000/api/usuarios',{
            method: 'GET',
            credentials: "include",
        })

        if(res.status !== 200){
            throw new Error('erro ao buscar cadastro do usuário')
        }
        
        const {data:usuario, error}: {data:User, error:string} = await res.json()
        
        if(!usuario){
            throw new Error(error)        
        }
        return usuario        
    }
    
    return  useQuery<User>({
        queryKey: ['usuario'],
        queryFn: fetchUsuario,
        placeholderData: keepPreviousData,
    },)
}

export const updateUsuario = async(novoUsuario:User):Promise<User> => {
    const res = await fetch('http://localhost:3000/api/usuarios',{
        method: 'POST',
        credentials: "include",
        body: JSON.stringify(novoUsuario)
    })

    if(res.status !== 200){
        throw new Error('erro ao atualizar usuário')
    }
    
    const {data:usuario, error}: {data:User, error:string} = await res.json()
    
    if(!usuario){
        throw new Error(error)        
    }

    return novoUsuario        
}