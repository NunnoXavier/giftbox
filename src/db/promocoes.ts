import { Product, Promocao } from "@/types/types";
import query from "./postgres";
import { getProdutos } from "./produtos";

export const getPromocao = async (id: number): Promise<{ data:Promocao|null, error: string|null }> => {
    try {
        const res = await query(`
            SELECT * from promocoes where id = ${id.toString()}           
        `)

        const {data:produtos, error: errorProdutos} = await getPromocoesProducts(id)
    
        if(errorProdutos) return {data:null, error:errorProdutos}

        if(!res.rows[0] || res.rows.length === 0) return {data:null, error:"Promoção não encontrada"}
        
        const promocao:Promocao = {
            id: res.rows[0].id,
            title: res.rows[0].title,
            banner: res.rows[0].banner,
            createdAt: res.rows[0].createdat,
            finalDate: res.rows[0].finaldate,
            products: produtos || []
        }
    
        return {data:promocao, error:null}
        
    } catch (error:any) {
        return {data:null, error:error.message}        
    }

}

export const getPromocoes = async (): Promise<{ data:Promocao[]|null, error: string|null }> => {
    try {
        const resId = await query(`
            SELECT * from promocoes
        `)

        const promises = resId.rows.map(async (row:any) => {
            return { promo: row, promiseProdutos: await getPromocoesProducts(row.id) }
        })

        const results = await Promise.all(promises)

        const promocoes = results.map((result):Promocao => {
             return {
                id: result.promo.id,
                title: result.promo.title,
                banner: result.promo.banner,
                createdAt: result.promo.createdat,
                finalDate: result.promo.finaldate,
                products: result.promiseProdutos.data || []
             }
        })
   
    
        return {data:promocoes, error:null}
        
    } catch (error:any) {
        return {data:null, error:error.message}        
    }

}

export const getPromocoesProducts = async (id: number): Promise<{ data:Product[]|null, error: string|null }> => {
    try {
        const res = await query(`
            SELECT idproduct, discountpercentage from promocoes_products where idpromo = ${id.toString()}
        `)
            
        const promises = res.rows.map((row:any) => {
            return getProdutos({ campo: "id", valor: row.idproduct })
        })
    
        const results = await Promise.all(promises)
    
        const produtos = results.map((result) => {
            return result.data
        })
        .filter((data) => {
            return data !== null
        })
        .flat()
        .map((p) => ({
            ...p,
            discountPercentage: res.rows.find((row:any) => row.idproduct === p.id)?.discountpercentage || 0
        }))
    
        return  { data: produtos, error: null }
        
    } catch (error:any) {
        return { data: null, error: error.message }        
    }
}

export const putPromocao = async (promocao: Promocao): Promise<{ data:Promocao|null, error: string|null }> => {
    try {
        const resInsert = await query(`
            INSERT INTO promocoes (title, banner, createdat, finaldate) 
            VALUES ('${promocao.title}', '${promocao.banner}', 
            '${promocao.createdAt.toString().slice(0,10) || '1900-01-01'}',
            '${promocao.finalDate.toString().slice(0,10) || '1900-01-01'}') 
            RETURNING id
        `)

        const {data, error} = await getPromocao(resInsert.rows[0].id)

        if(!data){
            return {data:null, error:error}
        }
        
        return {data, error:null}

    } catch (error:any) {
        return {data:null, error:error.message}
    }
}

export const updatePromocao = async (promocao: Promocao): Promise<{ data:Promocao|null, error: string|null }> => {
    try {
        await query(`
            UPDATE promocoes SET 
            title='${promocao.title}', banner='${promocao.banner}', 
            createdat='${promocao.createdAt.toString().slice(0,10) || '1900-01-01'}', 
            finaldate='${promocao.finalDate.toString().slice(0,10) || '1900-01-01'}'
            WHERE id = ${promocao.id}
        `)
  
        return {data:promocao, error:null}

    } catch (error:any) {
        return {data:null, error:error.message}
    }
}



export const putProdutoPromocao = async (idPromo: number, produto: Product): Promise<{ data:Product|null, error: string|null }> => {
    try {
        await query(`
            INSERT INTO promocoes_products (idpromo, idproduct, discountpercentage)
            VALUES (${idPromo.toString()}, ${produto.id?.toString() || 0}, 
            ${produto.discountPercentage || 0})
        `)        

        return {data: produto, error:null}

    } catch (error:any) {
        return {data:null, error:error.message}
    }
}

export const putProdutosPromocao = async (promocao: Promocao): Promise<{ data:Promocao|null, error: string|null }> => {
    try {
        if(!promocao.id){
            return {data:null, error:"promoção não encontrada"}
        }

        await query(`
            DELETE FROM promocoes_products WHERE idpromo = ${promocao.id}
            RETURNING id
        `)

        const promises = promocao.products?.map(async (produto) => {
            const result = await putProdutoPromocao(promocao.id!, produto)
            return result.data
        })

        if(!promises){
            return {data:null, error:"nenhum produto encontrado"}
        }

        const produtos = (await Promise.all(promises))
        .filter((data) => data !== null)
        
        return {data:{ ...promocao, products: produtos }, error:null}

    } catch (error:any) {
        return {data:null, error:error.message}
    }
}

