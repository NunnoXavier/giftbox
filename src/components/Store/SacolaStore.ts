import { ProductCart } from "@/types/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"


export const createQuerySacola = () => {
    const fetchSacola = async():Promise<ProductCart[]> => {
        const storage = localStorage.getItem('sacola')

        const itensSacola:ProductCart[] = storage? JSON.parse(storage) : []
        return itensSacola
    }
    
    return  useQuery<ProductCart[]>({
        queryKey: ['sacola'],
        queryFn: fetchSacola,
        placeholderData: keepPreviousData,
    },)
}

export const fetchAddQtdeItem = async(item:ProductCart):Promise<ProductCart> => {
    item.qtde += 1
     
    const storage = localStorage.getItem('sacola')
    const itensSacola:ProductCart[] = storage? JSON.parse(storage) : []
    const novoItensSacola = itensSacola.map((i) => i.id === item.id? item: i)
    localStorage.setItem('sacola', JSON.stringify(novoItensSacola))
    return item
}


export const fetchSubQtdeItem = async(item:ProductCart):Promise<ProductCart> => {
    item.qtde -= 1
    
    const storage = localStorage.getItem('sacola')
    const itensSacola:ProductCart[] = storage? JSON.parse(storage) : []
    const novoItensSacola = itensSacola.map((i) => i.id === item.id? item: i)
    localStorage.setItem('sacola', JSON.stringify(novoItensSacola))
    return item
}

export const fetchAddItem = async(item:ProductCart):Promise<ProductCart> => {
    const storage = localStorage.getItem('sacola')
    const itensSacola:ProductCart[] = storage? JSON.parse(storage) : []
    const novoId = itensSacola.length +1
    const novoItensSacola = [ ...itensSacola, { ...item, id: novoId } ]    
    localStorage.setItem('sacola', JSON.stringify(novoItensSacola))
    return item
}

export const fetchRemoveItem = async(item:ProductCart):Promise<ProductCart> => {
    const storage = localStorage.getItem('sacola')
    const itensSacola:ProductCart[] = storage? JSON.parse(storage) : []
    const novoItensSacola = itensSacola.filter((i) => i.id !== item.id)
    localStorage.setItem('sacola', JSON.stringify(novoItensSacola))
    return item
}

