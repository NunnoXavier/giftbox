import { Product } from "@/types/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const createQueryProdutos = () => {
    const fetchProdutos = async ():Promise<Product[]> => {
        const res = await fetch('http://localhost:3000/api/produtos')
        if(res.status !== 200){
            throw new Error('erro ao efetuar fetch dos produtos')
        }
        const {data, error}:{data:Product[], error:string} = await res.json()

        if(!data){
            throw new Error(error)
        }      

        return data
    }

    return  useQuery<Product[]>({
        queryKey:['produtos'],
        queryFn: fetchProdutos,
        placeholderData: keepPreviousData
    })    
}