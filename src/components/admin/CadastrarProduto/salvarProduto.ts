import { Product } from "@/types/types"
import { revalidateTag } from "next/cache"

export const fetchSalvarProduto = async({produto}:{produto:Product}) => {
    const res = await fetch('http://localhost:3000/api/protegido/produtos/cadastrar',{
        method: produto.id === 0? 'PUT': 'POST',
        headers:{ "Content-type":"Application-json" },
        body: JSON.stringify(produto),                
    })

    revalidateTag('produtos')

    return res
            
}