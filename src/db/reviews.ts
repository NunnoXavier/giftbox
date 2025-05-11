import { Review } from "@/types/types"
import query, { getQueryProps } from "./postgres"

type ResultReview = {data:|Review[]|null, error: |string|null}
export const getReviews = async (props?: getQueryProps ):Promise<ResultReview> => {
    try {
        const sql = !props?.campo? `select * from reviews` : 
                            `select * from reviews where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const reviews = rows.map((row):Review => {
            return {
                reviewerName: row.reviewername,
                rating: row.rating,
                comment: row.comment,
                date: row.date,
                reviewerEmail: row.revieweremail,
            }
        })
    
        return { data:reviews, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}