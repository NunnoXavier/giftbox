import { ProductCart } from "@/types/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const createQuerySacola = () => {
    const fetchSacola = async():Promise<ProductCart[]> => {
        const res = await fetch('http://localhost:3000/api/usuarios/sacola', {
            credentials: "include"
        })
        if(res.status !== 200){ 
            throw new Error('erro ao efetuar fetch dos dados da sacola')
        }
        
        const { data, error }:{ data:ProductCart[], error: string } = await res.json()
        if(!data){
            throw new Error(error)            
        }
        
        return data
    }
    
    return  useQuery<ProductCart[]>({
        queryKey: ['sacola'],
        queryFn: fetchSacola,
        placeholderData: keepPreviousData,
    },)
}

export const fetchAddQtdeItem = async(item:ProductCart):Promise<ProductCart> => {
    item.qtde += 1
    const res = await fetch('http://localhost:3000/api/usuarios/sacola', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(item)

    })

    if(res.status !== 200){ 
        throw new Error('erro ao efetuar fetch dos dados da sacola')
    }
    
    const { data, error }:{ data:ProductCart[], error: string } = await res.json()
    if(!data){
        throw new Error(error)            
    }

    return item
}

export const fetchAddItem = async(item:ProductCart):Promise<ProductCart> => {
    const res = await fetch('http://localhost:3000/api/usuarios/sacola', {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(item)

    })

    if(res.status !== 200){ 
        throw new Error('erro ao efetuar fetch dos dados da sacola')
    }
    
    const { data, error }:{ data:ProductCart[], error: string } = await res.json()
    if(!data){
        throw new Error(error)            
    }

    return item
}

export const fetchSubQtdeItem = async(item:ProductCart):Promise<ProductCart> => {
    item.qtde -= 1
    const res = await fetch('http://localhost:3000/api/usuarios/sacola', {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(item)

    })

    if(res.status !== 200){ 
        throw new Error('erro ao efetuar fetch dos dados da sacola')
    }
    
    const { data, error }:{ data:ProductCart[], error: string } = await res.json()
    if(!data){
        throw new Error(error)            
    }

    return item
}

export const fetchRemoveItem = async(item:ProductCart):Promise<ProductCart> => {
    const res = await fetch('http://localhost:3000/api/usuarios/sacola', {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(item)

    })

    if(res.status !== 200){ 
        throw new Error('erro ao efetuar fetch dos dados da sacola')
    }
    
    const { data, error }:{ data:ProductCart[], error: string } = await res.json()
    if(!data){
        throw new Error(error)            
    }

    return item
}

