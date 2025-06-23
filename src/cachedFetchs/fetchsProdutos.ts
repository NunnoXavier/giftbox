import { Product } from "@/types/types"

const umaHora = 60

export const fetchProdutos = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/produtos`, {
            cache: "force-cache",
            next: {
                tags: ['produtos'],
                revalidate: umaHora,
            }
        })
    
        const { data, error }:{data: Product[], error:string} = await res.json()
        if(!data){
            throw new Error(error)
        } 
            
        return data
        
    } catch (error:any) {
        throw new Error(error.message)        
    }
}

export const fetchPrecoProdutos = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/produtos/precos', {
            cache: "force-cache",
            next: {
                tags: ['preco-produtos'],
                revalidate: 60, //atualiza a cada minuto
            }
        })
        const { data, error }:{data: {id:number, price:number, discountPercentage: number}[], error:string} = await res.json()
        if(!data){
            throw new Error(error)
        } 
    
        return data
        
    } catch (error:any) {
        throw new Error(error.message)        
    }
}

export const fetchEstoqueProdutos = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/produtos/estoque', {
            cache: "force-cache",
            next: {
                tags: ['estoque-produtos'],
                revalidate: 60, //atualiza a cada minuto
            }
        })
        
        const { data, error }:{data: {id:number, stock:number}[], error:string} = await res.json()
        if(!data){
            throw new Error(error)
        } 

        return data
        
    } catch (error:any) {
        throw new Error(error.message)        
    }
}

