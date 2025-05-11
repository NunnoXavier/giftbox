import query from "./postgres"
import { Product, ProductDTO } from "@/types/types"
import { getCategorias } from "./secoes"
import { getReviews } from "./reviews"
import { getImages } from "./images"
import { getTags } from "./tags"

type getProductProps = {campo?:string, valor?:any}

type Result = {data:|Product[]|null, error: |string|null}

export const getProdutos = async (props?: getProductProps ):Promise<Result> => {
    try {
        const sql = !props?.campo? `select * from products` : 
                            `select * from products where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const products:Product[] = rows.map((row):Product => {
            return {
                id: row.id,
                availabilityStatus: row.availabilitystatus,
                brand: row.brand,
                category: {
                    id:  row.idcategory,
                    description: "",
                },
                description: row.description,
                dimensions: {
                    depth: row.depth,
                    height: row.height,
                    width: row.width,
                },
                discountPercentage: row.discountpercentage,
                price: row.price,
                images: [],
                meta: {
                    createdAt: row.createdat,
                    updatedAt: row.updatedat,
                    barcode: row.barcode,
                    qrCode: row.qrcode,
                },
                rating: row.rating,
                reviews: [],
                sku: row.sku,
                stock: row.stock,
                tags: [],
                title: row.title,
                warrantyInformation: row.warrantyinformation,
                weight: row.weight,
                shippingInformation: row.shippinginformation,
                returnPolicy: row.returnpolicy,
                minimumOrderQuantity: row.minimumorderquantity,
                thumbnail: row.thumbnail                   
            }
        })

        for(const produto of products) {
            const category = await getCategorias({campo: "id", valor: produto.category?.id})
            produto.category = {
                id: category.data?.[0].id || 0,
                description: category.data?.[0].description || ""
            }

            const reviews = await getReviews({campo: "idproduct", valor: produto.id})
            produto.reviews = reviews.data || []
            
            const images = await getImages({campo: "idproduct", valor: produto.id})
            produto.images = images.data || []
            
            const tags = await getTags({campo: "idproduct", valor: produto.id})
            produto.tags = tags.data || []
        }
    
        return { data: products, error: null }        
    } catch (error:any) {
        return {data: null, error: error.message}
    }
}

export const getCamposProdutos = async ( {campos}:{campos:string[]} ):Promise<Result> => {
    try {
        const sql = `select ${ campos.join(',') } from products`
        
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
            values('${novoProduto.title || ""}', '${novoProduto.description ||""}', ${novoProduto.category?.id.toString()||9999}, 
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
        await query(`update products set 
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

        const { data:res, error:errorRes } = await getProdutos({campo:'id', valor:novoProduto.id})
        if(!res){
            throw new Error(errorRes || 'erro inexperado ao obter produto')
        }

        const result = res[0]
        
        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}
