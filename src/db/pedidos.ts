import { ChStatus, Order, OrderPayment, OrderProduct, OrderShipping, OrderStatus } from "@/types/types"
import query from "./postgres"

type getProps = {campo?:string, valor?:any}

type Result = {data:|Order[]|null, error: |string|null}

export const getPedidos = async (props?: getProps ):Promise<Result> => {
    try {
        const sql = !props?.campo? `select * from orders` 
                                  :`select * from orders where orders.${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const orders:Order[] = rows.map((row):Order => {
            
            return {
                id: row.id,
                date: row.date || undefined,
                dtprev: row.dtprev || undefined,
                idUser: row.iduser,
                payment: undefined,
                products: [],
                shipping: undefined,
                status: row.status || 'pending',

            }
        })
    
        for( const order of orders ){
            const { data:produtos} = await getProdutosPedido({ campo: "idorder", valor: order.id })
            const { data:pagtos} = await getPagtoPedido({ campo: "idorder", valor: order.id })
            const { data:entregas} = await getEntregaPedido({ campo: "idorder", valor: order.id })

            const pagamento = pagtos? pagtos[0] : undefined
            const entrega = entregas? entregas[0] : undefined

            order.products = produtos || undefined
            order.payment = pagamento
            order.shipping = entrega
        }

        return { data: orders, error: null }        
    } catch (error:any) {
        return {data: null, error: error.message}
    }
}

type ResultId = {data:|number|null, error: |string|null}
export const putPedido = async (novoPedido: Order):Promise<ResultId> => {
    try {
        const res = await query(`insert into orders (iduser, date, dtprev )
            values( ${novoPedido.idUser || 0}, '${novoPedido.date?.toString()?.slice(0,10) || '1900-01-01' }', 
            '${novoPedido.dtprev?.toString()?.slice(0,10) || '1900-01-01'}') RETURNING id
        `)
        
        const id = res.rows[0].id
        return { data:id, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

type ResultOrder = {data:|Order|null, error: |string|null}
export const updatePedido = async (novoPedido: Order):Promise<ResultOrder> => {
    try {
        if(!novoPedido.id || novoPedido.id ===0){
            throw new Error('id não informado')
        }

        await query(`update orders set 
            date='${novoPedido.date?.toString()?.slice(0,10) || "1900-01-01"}',
            dtprev='${novoPedido.dtprev?.toString()?.slice(0,10) || "1900-01-01"}',
            status='${novoPedido.status || 'pending'}'
            where id = ${novoPedido.id.toString()}`)
        
        const { data:pedidos, error:errorPedidos } = await getPedidos({campo: 'id', valor: novoPedido.id.toString()})
        
        if(!pedidos){
            throw new Error(errorPedidos || "erro inexperado ao obter pedido")
        }

        const result = pedidos[0]

        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

export const removePedido = async ({id}:{id:number}):Promise<ResultId> => {
    try {
        const res = await query(`delete from orders where id = ${id.toString()}`)
        
        return { data:id, error:null }
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

//////////////////////////////  OrderProducts //////////////////////////////////////
type ResultOPs = {data:|OrderProduct[]|null, error: |string|null}
export const getProdutosPedido = async (props?: getProps ):Promise<ResultOPs> => {
    try {
        const sql = !props?.campo? `select * from order_products` : 
                            `select * from order_products where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const orderProducts:OrderProduct[] = rows.map((row) => {
            return {
                id: row.id || 0,
                idProduct: row.idproduct || 0,
                price: row.price || 0,
                qtde: row.qtde || 0,
                title: row.title || "",
                discountPercentage: row.discountpercentage || 0,
                thumbnail: row.thumbnail || "",            
                rate: row.rate || -1,
            }
        })
    
        return { data: orderProducts, error: null }        
    } catch (error:any) {
        return {data: null, error: error.message}
    }
}

export const putProdutoPedido = async (pedido:number, novoProduto: OrderProduct|OrderProduct[]):Promise<ResultId> => {
    try {
        if( Array.isArray(novoProduto)){
            let id = 0
            for( const p of novoProduto ){
                const res = await query(`insert into order_products (idorder, idproduct, qtde, title, thumbnail, price, 
                    discountPercentage)
                    values( ${pedido}, ${p.idProduct.toString() || 0 }, ${p.qtde.toString() || 0},
                    '${p.title}', '${p.thumbnail || ''}', ${p.price?.toString() || 0 },
                     ${p.discountPercentage?.toString() || 0 }) RETURNING id
                `)
                id = res.rows[0].id
            }
            return { data:id, error:null }            

        }else{
            const res = await query(`insert into order_products (idorder, idproduct, qtde, title, thumbnail, price, 
                discountPercentage)
                values( ${pedido}, ${novoProduto.idProduct.toString() || 0 }, ${novoProduto.qtde.toString() || 0},
                '${novoProduto.title}', '${novoProduto.thumbnail || ''}', ${novoProduto.price?.toString() || 0 },
                 ${novoProduto.discountPercentage?.toString() || 0 }) RETURNING id
            `)
            
            const id = res.rows[0].id
            return { data:id, error:null }        

        }
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

type ResultOP = {data:|OrderProduct|null, error: |string|null}
export const updateProdutoPedido = async (novoProduto: OrderProduct):Promise<ResultOP> => {
    try {
        if(!novoProduto.idProduct || novoProduto.idProduct === 0){
            throw new Error('id não informado')
        }

        if(!novoProduto.id || novoProduto.id === 0){
            throw new Error('id não informado')
        }

        await query(`update order_products set 
            qtde=${novoProduto.qtde.toString() || 0}, title='${novoProduto.title}', 
            thumbnail='${novoProduto.thumbnail || ''}', price=${novoProduto.price?.toString() || 0 }, 
            discountPercentage=${novoProduto.discountPercentage?.toString() || 0 }
            where id = ${novoProduto.id.toString()}`)

        const res = await query(`select * from order_products 
            where id = ${novoProduto.id.toString()}`)

        const row = res.rows[0]

        const result:OrderProduct = {
            idProduct: row.idproduct,
            price: row.price,
            qtde: row.qtde,
            title: row.title,
            discountPercentage: row.discountpercentage,
            thumbnail: row.thumbnail,
        }

        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

export const removeProdutoPedido = async ({pedido, id}:{pedido:number, id?:number}):Promise<ResultId> => {
    try {
        const sql = id?
            `delete from order_products where idorder = ${pedido.toString()} and idproduct= ${id.toString()}`
        :   `delete from order_products where idorder = ${pedido.toString()}`
        await query(sql)
        
        return { data:pedido, error:null }
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}
//////////////////////////////  OrderPayment //////////////////////////////////////
type ResultOPays = {data:|OrderPayment[]|null, error: |string|null}
export const getPagtoPedido = async (props?: getProps ):Promise<ResultOPays> => {
    try {
        const sql = !props?.campo? `select * from order_payments` : 
                            `select * from order_payments where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const orderPayments:OrderPayment[] = rows.map((row) => {
            return {
                cardCvv: row.cardcvv,
                cardExpire: row.cardexpire,
                cardHolderDoc: row.cardholderdoc,
                cardHolderName: row.cardholdername,
                cardNumber: row.cardnumber,
                date: row.date,
                discountPercentage: row.discountpercentage,
                parc: row.parc,
                paymentMethod: row.paymentmethod,
                value: row.value
            }
        })
    
        return { data: orderPayments, error: null }        
    } catch (error:any) {
        return {data: null, error: error.message}
    }
}

export const putPagtoPedido = async (pedido:number, novoPagto: OrderPayment):Promise<ResultId> => {
    try {
        const res = await query(`insert into order_payments (idorder, date, parc, value, discountpercentage,
                paymentmethod, cardexpire, cardnumber, cardholdername, cardholderdoc, cardcvv)
            values( ${pedido}, '${novoPagto.date?.toString()?.slice(0,10) || '1900-01-01' }', ${novoPagto.parc?.toString() || 0},
            ${novoPagto.value?.toString() || 0}, ${novoPagto.discountPercentage?.toString() || 0}, '${novoPagto.paymentMethod || "" }',
             '${novoPagto.cardExpire || "" }', '${novoPagto.cardNumber || "" }', '${novoPagto.cardHolderName || "" }', 
             '${novoPagto.cardHolderDoc || "" }', ${novoPagto.cardCvv?.toString() || 0 }) RETURNING id
        `)
        
        const id = res.rows[0].id
        return { data:id, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

type ResultOPay = {data:|OrderPayment|null, error: |string|null}
export const updatePagtoPedido = async (pedido:number, novoPagto: OrderPayment):Promise<ResultOPay> => {
    try {
        if(!pedido || pedido === 0){
            throw new Error('pedido não informado')
        }

        await query(`update order_payments set 
            date='${novoPagto.date?.toString()?.slice(0,10) || '1900-01-01' }', 
            parc=${novoPagto.parc?.toString() || 0}, value=${novoPagto.value?.toString() || 0}, 
            discountPercentage=${novoPagto.discountPercentage?.toString() || 0},
            paymentmethod='${novoPagto.paymentMethod || "" }', cardExpire='${novoPagto.cardExpire || "" }', 
            cardNumber='${novoPagto.cardNumber || "" }', cardHolderName='${novoPagto.cardHolderName || "" }',  
            cardHolderDoc='${novoPagto.cardHolderDoc || "" }', cardcvv=${novoPagto.cardCvv?.toString() || 0 }
            where idorder = ${pedido}`)

        const res = await query(`select * from order_payments where idorder = ${pedido}`)

        const row = res.rows[0]
        
        const result:OrderPayment = {
            cardCvv: row.cardcvv,
            cardExpire: row.cardexpire,
            cardHolderDoc: row.cardholderdoc,
            cardHolderName: row.cardholdername,
            cardNumber: row.cardnumber,
            date: row.date,
            discountPercentage: row.discountpercentage,
            parc: row.parc,
            paymentMethod: row.paymentmethod,
            value: row.value
        }

        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

//////////////////////////////  OrderShipping //////////////////////////////////////
type ResultOSs = {data:|OrderShipping[]|null, error: |string|null}
export const getEntregaPedido = async (props?: getProps ):Promise<ResultOSs> => {
    try {
        const sql = !props?.campo? `select * from order_shipping` : 
                            `select * from order_shipping where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const orderShippings:OrderShipping[] = rows.map((row) => {
            return {
                address: row.address,
                city: row.city,
                date: row.date || undefined,
                daysprev: row.daysprev,
                obs: row.obs,
                postalCode: row.postalcode,
                receivedAt: row.receivedat || undefined,
                receivedBy: row.receivedby,
                state: row.state,
                value: row.value,
                trackingCode: row.trackingcode ?? ''
            }
        })
    
        return { data: orderShippings, error: null }        
    } catch (error:any) {
        return {data: null, error: error.message}
    }
}

export const putEntregaPedido = async (pedido:number, novaEntrega: OrderShipping):Promise<ResultId> => {
    try {
        const res = await query(`insert into order_shipping (idorder, date, daysprev, value, address,obs,
                city, state, postalCode, receivedby, receivedAt)
            values( ${pedido}, '${novaEntrega.date?.toString()?.slice(0,10) || '1900-01-01' }', 
            ${novaEntrega.daysprev?.toString() || 0 }, ${novaEntrega.value?.toString() || 0}, 
            '${novaEntrega.address || ""}', '${novaEntrega.obs || "" }', '${novaEntrega.city || "" }', 
            '${novaEntrega.state || "" }', '${novaEntrega.postalCode || "" }', 
             '${novaEntrega.receivedBy || "" }',
             '${novaEntrega.receivedAt?.toString()?.slice(0,10) || '1900-01-01' }') RETURNING id
        `)
        
        const id = res.rows[0].id
        return { data:id, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

type ResultOSh = {data:|OrderShipping|null, error: |string|null}
export const updateEntregaPedido = async (pedido:number, novaEntrega: OrderShipping):Promise<ResultOSh> => {
    try {
        if(!pedido || pedido === 0){
            throw new Error('pedido não informado')
        }

        await query(`update order_shipping set 
                date='${novaEntrega.date?.toString()?.slice(0,10) || '1900-01-01' }',  
                daysprev=${novaEntrega.daysprev?.toString() || 0 }, value=${novaEntrega.value?.toString() || 0},
                address='${novaEntrega.address || ""}', obs='${novaEntrega.obs || "" }',                
                city='${novaEntrega.city || "" }', state='${novaEntrega.state || "" }', 
                postalCode='${novaEntrega.postalCode || "" }', receivedby='${novaEntrega.receivedBy || "" }', 
                receivedAt='${novaEntrega.receivedAt?.toString()?.slice(0,10) || '1900-01-01' }',
                trackingcode='${novaEntrega.trackingCode || "" }'
                where idorder=${pedido}`)
        

        const res = await query(`select * from order_shipping where idorder = ${pedido}`)
        const row = res.rows[0]
        const result:OrderShipping = {
            address: row.address,
            city: row.city,
            date: row.date || undefined,
            daysprev: row.daysprev,
            obs: row.obs,
            postalCode: row.postalCode,
            receivedAt: row.receivedat || undefined,
            receivedBy: row.receivedby,
            state: row.state,
            value: row.value,
            trackingCode: row.trackingcode ?? ''
        }

        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

export const updateStatusPedido = async ({ idPedido, novoStatus}:ChStatus):Promise<ResultOrder> => {
    try {
        if(!idPedido || idPedido ===0){
            throw new Error('id não informado')
        }

        await query(`update orders set status = '${novoStatus}' where id = ${idPedido}`)
    
        const { data:pedidos, error:errorPedidos } = await getPedidos({campo: 'id', valor: idPedido.toString()})
        
        if(!pedidos){
            throw new Error(errorPedidos || "erro inexperado ao obter pedido")
        }

        const result = pedidos[0]

        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}

export const updateRastreioPedido = async (idPedido: number, novoCodRastreio:string):Promise<ResultOrder> => {
    try {
        if(!idPedido || idPedido ===0){
            throw new Error('id não informado')
        }

        await query(`update orders set trackingcode = '${novoCodRastreio}' where id = ${idPedido}`)
    
        const { data:pedidos, error:errorPedidos } = await getPedidos({campo: 'id', valor: idPedido.toString()})
        
        if(!pedidos){
            throw new Error(errorPedidos || "erro inexperado ao obter pedido")
        }

        const result = pedidos[0]

        return { data:result, error:null }        
    } catch (error:any) {
        return { data:null, error:error.message }
    }
}
