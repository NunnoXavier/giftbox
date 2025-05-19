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
                id: row.id,
                idOrder: row.idorder,
                idProduct: row.idproduct,
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

export const insertOrUpdateReview = async (review:Review):Promise<ResultReview> => {
    try {
        const sql = `
            insert into reviews (idorder, idproduct, rating, comment, date, reviewername, revieweremail)
            values (${review.idOrder.toString() || 0}, ${review.idProduct.toString() ||0}, 
            ${review.rating.toString() || 0}, '${review.comment || ""}', 
            '${review.date?.toString().slice(0,10) || "1900-01-01"}', '${review.reviewerName || ""}', '${review.reviewerEmail || ""}')
            on conflict (idorder, idproduct) do update
            set rating = ${review.rating.toString() || 0}, comment = '${review.comment || ""}', 
            date = '${review.date?.toString().slice(0,10) || "1900-01-01"}' RETURNING *
        `
        const res = await query(sql)
        const rows = res.rows

        const reviews = rows.map((row):Review => {
            return {
                id: row.id,
                idOrder: row.idorder,
                idProduct: row.idproduct,
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