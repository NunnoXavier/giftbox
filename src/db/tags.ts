import { Tag } from "@/types/types"
import query, { getQueryProps } from "./postgres"

type ResultTag = {data:|Tag[]|null, error: |string|null}
export const getTags = async (props?: getQueryProps ):Promise<ResultTag> => {
    try {
        const sql = !props?.campo? `select * from tags` : 
                            `select * from tags where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const tags = rows.map((row):Tag => {
            return {
                id: row.id,
                description: row.description
            }
        })
    
        return { data:tags, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}