import query, { ResultId } from "./postgres"
import { Category } from "@/types/types"

type getCategoryProps = {campo?:string, valor?:any}

type ResultCategory = {data:|Category[]|null, error: |string|null}
export const getCategorias = async (props?: getCategoryProps ):Promise<ResultCategory> => {
    try {
        const sql = !props?.campo? `select * from categories` : 
        `select * from categories where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
        
        const categorias = rows.map((row):Category => {
            return {
                id: row.id,
                description: row.description
            }
        })
        
        return { data:categorias, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}

export const putCategoria = async (novaCategoria: Category):Promise<ResultId> => {
    try {
        const res = await query(`insert into categories ( description )
            values('${novaCategoria.description || ""}') RETURNING id`)
        
        const id = res.rows[0].id
        return { data: id, error: null }        
    } catch (error:any) {
        return { data: null, error: error.message }        
    }
}

