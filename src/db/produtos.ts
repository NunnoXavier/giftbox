import query from "./postgres"
import {ImageDTO, Product, ProductDTO, Review, ReviewDTO, Tag, TagDTO } from "@/types/types"

type getProductProps = {campo?:string, valor?:any}

type SetProductProps = {
    id: number,
    campos: [ getProductProps ]
}

type Result = {data:|ProductDTO[]|null, error: |string|null}

export const getProdutos = async (props?: getProductProps ):Promise<Result> => {
    try {
        const sql = !props?.campo? `select * from products` : 
                            `select * from products where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const products:ProductDTO[] = rows.map((row) => {
            return {
                ...row
            }
        })
    
        return { data: products, error: null }        
    } catch (error:any) {
        return {data: null, error: error.message}
    }
}

type ResultId = {data:|number|null, error: |string|null}
export const putProduto = async (novoProduto: Product):Promise<ResultId> => {
    try {
        const res = await query(`insert into products ( title, description, idcategory, price, discountPercentage,
                                 rating, stock, brand, sku, weight, width, height, depth, warrantyInformation,
                                 shippingInformation, availabilityStatus, returnPolicy, minimumOrderQuantity,
                                 createdAt, updatedAt, barcode, qrCode, thumbnail )
            values('${novoProduto.title || ''}', '${novoProduto.description ||''}', ${novoProduto.category?.id.toString()||9999}, 
                    ${novoProduto.price?.toString() || 0}, ${novoProduto.discountPercentage?.toString() || 0},
                    ${novoProduto.rating?.toString() || 0}, ${novoProduto.stock?.toString() || 0}, 
                   '${novoProduto.brand || ''}', '${novoProduto.sku || ''}', 
                    ${novoProduto.weight?.toString() || 0}, ${novoProduto.dimensions?.width?.toString() || 0}, 
                    ${novoProduto.dimensions?.height?.toString() || 0}, ${novoProduto.dimensions?.depth?.toString() || 0}, 
                   '${novoProduto.warrantyInformation || ''}', '${novoProduto.shippingInformation || ''}', 
                   '${novoProduto.availabilityStatus || ''}', '${novoProduto.returnPolicy || ''}', 
                   ${novoProduto.minimumOrderQuantity?.toString() || 0}, 
                   '${novoProduto.meta?.createdAt?.toString()?.slice(0,10) || '1900-01-01'}', 
                   '${novoProduto.meta?.updatedAt?.toString()?.slice(0,10) || '1900-01-01'}', '${novoProduto.meta?.barcode || ''}', 
                   '${novoProduto.meta?.qrCode || ''}', '${novoProduto.thumbnail || ''}') RETURNING id
        `)
        
        const id = res.rows[0].id
        return { data:id, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

type ResultProduct = {data:|Product|null, error: |string|null}
export const updateProduto = async (novoProduto: Product):Promise<ResultProduct> => {
    try {
        if(!novoProduto.id || novoProduto.id ===0){
            throw new Error('id não informado')
        }
        const res = await query(`update products set 
            title='${novoProduto.title || ''}', description='${novoProduto.description ||''}', 
            idcategory=${novoProduto.category?.id.toString()||9999}, price=${novoProduto.price?.toString() || 0}, 
            discountPercentage=${novoProduto.discountPercentage?.toString() || 0},
            rating=${novoProduto.rating?.toString() || 0}, stock=${novoProduto.stock?.toString() || 0}, 
            brand='${novoProduto.brand || ''}', sku='${novoProduto.sku || ''}', 
            weight=${novoProduto.weight?.toString() || 0}, width=${novoProduto.dimensions?.width?.toString() || 0}, 
            height=${novoProduto.dimensions?.height?.toString() || 0}, depth=${novoProduto.dimensions?.depth?.toString() || 0}, 
            warrantyInformation='${novoProduto.warrantyInformation || ''}',
            shippingInformation='${novoProduto.shippingInformation || ''}', 
            availabilityStatus='${novoProduto.availabilityStatus || ''}', 
            returnPolicy='${novoProduto.returnPolicy || ''}', 
            minimumOrderQuantity=${novoProduto.minimumOrderQuantity?.toString() || 0},
            createdAt='${novoProduto.meta?.createdAt?.toString()?.slice(0,10) || '1900-01-01'}', 
            updatedAt='${novoProduto.meta?.updatedAt?.toString()?.slice(0,10) || '1900-01-01'}', 
            barcode='${novoProduto.meta?.barcode || ''}', qrCode='${novoProduto.meta?.qrCode || ''}', 
            thumbnail='${novoProduto.thumbnail || ''}'
            where id = ${novoProduto.id?.toString()}`)
        
        const result = novoProduto
        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

type ResultReview = {data:|ReviewDTO[]|null, error: |string|null}
export const getReviews = async (props?: getProductProps ):Promise<ResultReview> => {
    try {
        const sql = !props?.campo? `select * from reviews` : 
                            `select * from reviews where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const reviews:ReviewDTO[] = rows.map((row) => {
            return {
                ...row
            }
        })
    
        return { data:reviews, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}

type ResultTag = {data:|TagDTO[]|null, error: |string|null}
export const getTags = async (props?: getProductProps ):Promise<ResultTag> => {
    try {
        const sql = !props?.campo? `select * from tags` : 
                            `select * from tags where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const tags:TagDTO[] = rows.map((row) => {
            return {
                ...row
            }
        })
    
        return { data:tags, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}

type ResultImage = {data:|ImageDTO[]|null, error: |string|null}
export const getImages = async (props?: getProductProps ):Promise<ResultImage> => {
    try {
        const sql = !props?.campo? `select * from images` : 
                            `select * from images where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const images:ImageDTO[] = rows.map((row) => {
            return {
                ...row
            }
        })
    
        return { data:images, error: null }
        
    } catch (error:any) {
        return { data:null, error: error.message }        
    }
}

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