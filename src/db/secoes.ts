import query from "./postgres"
import { Category } from "@/types/types"

type getCategoryProps = {campo?:string, valor?:any}

type Result = {data:|Category[]|null, error: |string|null}

export const getCategorias = async (props?: getCategoryProps ):Promise<Result> => {
    try {
        const sql = !props?.campo? `select * from categories` : 
                            `select * from categories where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const categories:Category[] = rows.map((row) => {
            return {
                ...row
            }
        })        
        return {data: categories, error: null }
    } catch (error:any) {
        return { data: null, error: error }
    }

}

export const putCategoria = async (novaCategoria: Category):Promise<number|any> => {
    try {
        const res = await query(`insert into categories ( description )
            values('${novaCategoria.description || ''}'') RETURNING id
        `)
        
        const id = res.rows[0].id
        return res        
    } catch (error:any) {
        throw error.message
    }
}

