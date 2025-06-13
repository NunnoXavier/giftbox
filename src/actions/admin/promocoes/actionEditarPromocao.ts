import { Promocao } from "@/types/types";

export const actionEditarPromocao = async ( promocao: Promocao ): Promise<Promocao|null> => {
    const res = await fetch(`http://localhost:3000/api/produtos/promocoes`,{
        method: 'POST',
        body: JSON.stringify(promocao)
    })

    const { data, error }:{data:Promocao, error:string} = await res.json()

    if(error){
        console.log(error)
        return null
    }
    return data
}