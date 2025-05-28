import { ProductCart } from "@/types/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export type Precos = {
    id: number,
    price: number,
    discountPercentage: number,
}

export const compararPrecos = (itemSacola:ProductCart, precoCadastro: Precos):boolean => {
    return ( itemSacola.price === precoCadastro.price && itemSacola.discountPercentage === precoCadastro.discountPercentage )
}

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
        notifyOnChangeProps: "all"
    })
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

export const fetchAltItem = async(item:ProductCart):Promise<ProductCart> => {
    const storage = localStorage.getItem('sacola')
    const itensSacola:ProductCart[] = storage? JSON.parse(storage) : []
    const novoItensSacola = itensSacola.map((i) => i.id === item.id? item: i)
    localStorage.setItem('sacola', JSON.stringify(novoItensSacola))
    return item
}

export const fetchAddItem = async(item:ProductCart):Promise<ProductCart> => {
    const storage = localStorage.getItem('sacola')
    const itensSacola:ProductCart[] = storage? JSON.parse(storage) : []
    const novoId = procurarIdLivre(itensSacola)
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


const procurarIdLivre = (itensSacola: ProductCart[]):number => {
    let id = 0;
    
    while (id < 1000) {
        id ++
        if( !itensSacola.map((item) => item.id).includes(id) ){
            break
        }
    }
    
    return id
}

export const fetchRemoveAllItems = async():Promise<void> => {
    localStorage.setItem('sacola', JSON.stringify([]))
}