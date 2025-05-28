import { Product } from "@/types/types"
import query from "../postgres"
import { getProdutos } from "../produtos"

type ResultProduct = {data:|Product|null, error: |string|null}
export const updateRate = async (idProduct: number):Promise<ResultProduct> => {
    try {

        const valores = await query(`select sum(rating) as pontos, count(*) as votos from reviews
            where idproduct = ${idProduct}`)

        const pontos = valores.rows[0].pontos
        const votos = valores.rows[0].votos

        if(!pontos || !votos){
            return { data:null, error: 'não foi possível obter dados para atualizar rate' }
        }

        const rate = pontos / votos

        await query(`update products set rating=${rate} where id = ${idProduct}`)

        const { data:produtos, error } = await getProdutos({campo: "id", valor: idProduct})
        
        if(error){
            return { data:null, error:error }
        }

        const result = produtos?.[0]

        if(!result){
            return { data:null, error: 'não foi possível obter dados para atualizar rate' }
        }

        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}