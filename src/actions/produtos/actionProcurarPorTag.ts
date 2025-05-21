'use server'

import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import { Product } from "@/types/types"
import Fuse, { FuseResult } from "fuse.js"

interface MyResult extends FuseResult<Product> {
    item: Product,
    score: number    
}

export const actionProcurarProdutos = async (texto:string) => {
    try {
    const produtos = (await fetchProdutos())

    const fuse = new Fuse<Product>(produtos, {
        keys: [
            { name: 'title', weight: 0.6 },
            { name: 'tags', weight: 0.3 },
            { name: 'description', weight: 0.1 }
        ],
        threshold: 0.3, // Limiar mais baixo para mais resultados
        minMatchCharLength: 2, // Mínimo de caracteres para considerar match
        // includeScore: true,
        ignoreLocation: true,
        shouldSort: true,
        findAllMatches: true,
        useExtendedSearch: true, // Permite sintaxe de busca avançada
        ignoreFieldNorm: true,
        fieldNormWeight: 0.5
    })

    let resultado:MyResult[] = []    

    // Busca com termo exato
    fuse.search(`="${texto}"`)
    .map(result => resultado.push({ ... result, score: 1 }))

    // Busca com termo parcial
    fuse.search(texto)
    .map(result => resultado.push({ ... result, score: 0.5 }))


    //Busca por palavras separadas por espaço
    const palavras = texto.split(' ')
    palavras.forEach(palavra => {
        if(palavra.length > 2){
            fuse.search(palavra)
            .map(result => resultado.push({ ... result, score: 0.3 }))
        }
    })

    
    return resultado
        .filter((result, index, self) =>
            index === self.findIndex(r => r.item.id === result.item.id)
        )
        .sort((a, b) => a.score! - b.score!)
        .map(result => result.item)
    } catch (error:any) {
        throw new Error(error.message)        
    }
}