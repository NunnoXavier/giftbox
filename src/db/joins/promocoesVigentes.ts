import query from "../postgres"

type PromoProduct = {
 id:number, idProduct:number, discountPercentage:number
}

export const getPromocoesVigentes = async (): Promise<{ data:PromoProduct[]|null, error: string|null }> => {
    try {
        const resId = await query(`
            SELECT pai.id, filho.idproduct, filho.discountpercentage
            from promocoes pai
            join promocoes_products filho on pai.id = filho.idpromo            
            where createdat <= now() and finaldate >= now()
        `)
 
        const promocoes = resId.rows.map((row:any) => {
            return {
                id: row.id,
                idProduct: row.idproduct,
                discountPercentage: row.discountpercentage
            }
        })
    
        return {data:promocoes, error:null}
        
    } catch (error:any) {
        return {data:null, error:error.message}        
    }

}