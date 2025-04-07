import { ProductCart } from "@/types/types"
import query from "./postgres"

type ResultCarts = { data:ProductCart[]| null, error: string| null}
export const getSacola = async ({ idUser }:{idUser: number}):Promise<ResultCarts> => {
    try {
        const sql = `select * from carts where iduser = ${idUser.toString()}`
        
        const res = await query(sql)
        const rows = res.rows
        
        const cart:ProductCart[] = rows.map((row) => {
            return {
                id: row.id,
                idUser, 
                idProduct: row.idproduct,
                qtde: row.qtde
            }
        })
        
        return { data: cart, error: null }        
    } catch (error:any) {
        return { data: null, error: error.message }                
    }
}


type ResultId = { data:number|null, error: string| null}
export const putSacola = async (novoProduto: ProductCart):Promise<ResultId> => {
    try {
        const res = await query(`insert into carts (iduser,idproduct, qtde)
            values(${novoProduto.idUser || 0}, ${novoProduto.idProduct || 0},
                    ${novoProduto.qtde || 0}) RETURNING id
        `)
        
        const id = res.rows[0].id
        return { data: id, error: null }
    } catch (error:any) {
        return { data: null, error: error.message }        

    }

}

type ResultCart = { data:ProductCart| null, error: string| null}
export const updateSacola = async (novoProduto: ProductCart):Promise<ResultCart> => {
    try {
        const res = await query(`update carts set qtde=${novoProduto.qtde || 0} 
            where id=${novoProduto.id}`)
        
        return { data: novoProduto, error: null }
    } catch (error:any) {
        return { data: null, error: error.message }        

    }

}

type ResultTrueOrFalse = { data:boolean, error: string| null}
export const deleteSacola = async (produto: ProductCart):Promise<ResultTrueOrFalse> => {
    if(!produto.idUser || produto.idUser === 0){
        return { data: true, error: "usuario não informado"}
    }

    try {
        const sql = !produto.idProduct || produto.idProduct === 0? 
            `delete from carts where iduser = ${produto.idUser || 0}`
           : `delete from carts where iduser = ${produto.idUser || 0} and idproduct = ${produto.idProduct || 0}`
        
        const res = await query(sql)
        
        return { data: true, error: null }
    } catch (error:any) {
        return { data: false, error: error.message }        

    }
}