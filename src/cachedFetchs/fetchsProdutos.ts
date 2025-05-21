import { Product } from "@/types/types"

export const fetchProdutos = async () => {
    const res = await fetch(`http://localhost:3000/api/produtos`, {
        cache: "force-cache",
        next: {
            tags: ['produtos']
        }
    })

    const { data, error }:{data: Product[], error:string} = await res.json()
    if(!data) throw new Error(error)

    return data
}

export const fetchPrecoProdutos = async () => {
    const res = await fetch('http://localhost:3000/api/produtos/precos', {
        cache: "force-cache",
        next: {
            tags: ['preco-produtos'],
            revalidate: 60, //atualiza a cada minuto
        }
    })
    return res
}

export const fetchEstoqueProdutos = async () => {
    const res = await fetch('http://localhost:3000/api/produtos/estoque', {
        cache: "force-cache",
        next: {
            tags: ['estoque-produtos'],
            revalidate: 60, //atualiza a cada minuto
        }
    })
    return res
}

