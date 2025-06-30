import { Product } from "@/types/types"

const umaHora = 60 * 60

export const fetchProdutosAdmin = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/protegido/produtos`, {
            cache: "force-cache",
            next: {
                tags: ['produtos-admin'],
                revalidate: umaHora * 24,
            }
        })
    
        const { data, error }:{data: Product[], error:string} = await res.json()
        if(!data){
            console.log(error)
            return null
        } 
            
        return data
        
    } catch (error:any) {
        console.log(error.message)  
        return null      
    }
}

export const fetchProdutos = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/produtos`, {
            cache: "force-cache",
            next: {
                tags: ['produtos'],
                revalidate: umaHora * 24,
            }
        })
    
        const { data, error }:{data: Product[], error:string} = await res.json()
        if(!data){
            console.log(error)
            return null
        } 
            
        return data
        
    } catch (error:any) {
        console.log(error.message) 
        return null       
    }
}

export const fetchProdutosBusca = async () => {
    try {
        const res = await fetch(`http://localhost:3000/api/produtos/busca`, {
            cache: "force-cache",
            next: {
                tags: ['produtos-busca'],
                revalidate: umaHora * 24,
            }
        })
    
        const { data, error }:{data: Product[], error:string} = await res.json()
        if(!data){
            console.log(error)
            return null
        } 
            
        return data
        
    } catch (error:any) {
        console.log(error.message)        
    }
}

export const fetchProduto = async (id:number) => {
    try {
        const res = await fetch(`http://localhost:3000/api/produtos/${id.toString()}`, {
            cache: "force-cache",
            next: {
                tags: [`produto-${id.toString()}`],
                revalidate: umaHora * 24,
            }
        })
    
        const { data, error }:{data: Product[], error:string} = await res.json()
        if(!data){
            console.log(error)
            return null
        }   
        
        if(data.length === 0){
            console.log('Produto não encontrado')
            return null
        }
            
        return data[0]
        
    } catch (error:any) {
        console.log(error.message)        
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
            console.log(error)
            return null
        } 
    
        return data
        
    } catch (error:any) {
        console.log(error.message)        
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
            console.log(error)
            return null
        } 

        return data
        
    } catch (error:any) {
        console.log(error.message) 
        return null   
    }
}

