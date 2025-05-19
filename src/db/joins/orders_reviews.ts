import { Order, OrderProduct, Review } from "@/types/types"
import query, { getQueryProps } from "../postgres"

type JoinOrderReview = {
    order: Order,
    orderProduct: OrderProduct,
    review: Review
}

type ResultJoinOrderReview = {data:|JoinOrderReview[]|null, error: |string|null}
export const getJoinOrderReviews = async (props?: getQueryProps ):Promise<ResultJoinOrderReview> => {
    try {
        const sql = !props?.campo? `select *, 
            orders.id as orders_id, order_products.id as id_order_product, order_products.idproduct as idproduct_order_product,
            reviews.id as id_review,
            orders.date as order_date, reviews.date as review_date
            from order_products
            inner join orders on orders.id = order_products.idorder
            left join reviews on (reviews.idorder = order_products.idorder 
            and reviews.idproduct = order_products.idproduct)` : 
                                    `select *, 
            orders.id as orders_id, order_products.id as id_order_product, order_products.idproduct as idproduct_order_product,
            reviews.id as id_review,
            orders.date as order_date, reviews.date as review_date
            from order_products
            inner join orders on orders.id = order_products.idorder 
            left join reviews on (reviews.idorder = order_products.idorder 
            and reviews.idproduct = order_products.idproduct)
            where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const reviews = rows.map((row):JoinOrderReview => {
            return {
                order: {
                    id: row.orders_id,
                    idUser: row.iduser,
                    status: row.status,
                    date: row.orders_date,
                    dtprev: row.dtprev
                },
                orderProduct: {
                    id: row.id_order_product,
                    idProduct: row.idproduct_order_product,
                    price: row.price,
                    qtde: row.qtde,
                    title: row.title,
                    thumbnail: row.thumbnail,
                    discountPercentage: row.discountpercentage,
                },
                review: {
                id: row.id_review,
                idOrder: row.idorder,
                idProduct: row.idproduct,
                rating: row.rating,
                comment: row.comment,
                date: row.review_date,
                reviewerEmail: row.revieweremail,
                reviewerName: row.reviewername,                
                }
            }

        })
    
        return { data:reviews, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}