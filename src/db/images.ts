import query, { getQueryProps } from "./postgres"
import { Image } from "../types/types"

type ResultImage = {data:|Image[]|null, error: |string|null}
export const getImages = async (props?: getQueryProps ):Promise<ResultImage> => {
    try {
        const sql = !props?.campo? `select * from images` : 
                            `select * from images where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const images = rows.map((row):Image => {
            return {
                id: row.id,
                url: row.url,                
            }
        })
    
        return { data:images, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}

type ResultId = {data:|number|null, error: |string|null}
export const putImage = async (url:string, idProduct:number):Promise<ResultId> => {
    try {
        const res = await query(`insert into images ( url, idproduct )
            values('${url}', ${idProduct.toString()}) RETURNING id
        `)
        
        const id = res.rows[0].id
        return { data:id, error:null }
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

export const removeImage = async ({id}:{id:number}):Promise<ResultId> => {
    try {
        await query(`delete from images where id = ${id.toString()}`)
        
        return { data:id, error:null }
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}