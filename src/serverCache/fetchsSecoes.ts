import { Category } from "@/types/types"

export const fetchSecoes = async () => {
    const res = await fetch(`http://localhost:3000/api/secoes`, {
        cache: "force-cache",
        next: {
            tags: ['secoes']
        }
    })
    
    const { data:categorias, error:errorCategorias }:{data:Category[], error:string} = await res.json()
    if(errorCategorias){
        console.log(errorCategorias)        
        return null
    }

    return categorias    
}
