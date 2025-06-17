import query from "./postgres"
import { User } from "@/types/types"

type getUsuariosProps = {campo?:string, valor?:any}

type ResultUser = { data: User[]| null, error: string| null}
export const getUsuarios = async (props?: getUsuariosProps ):Promise<ResultUser> => {
    try {
        const sql = !props?.campo? `select * from users` : 
                            `select * from users where ${props?.campo} = '${props?.valor}'`
        
        const res = await query(sql)
        const rows = res.rows
    
        const users:User[] = rows.map((row):User => {
            return {
                id: row.id,
                firstName: row.firstname,
                lastName: row.lastname,
                email: row.email,
                birthday: row.birthday,
                phone: row.phone,
                username: row.username,
                password: row.password,
                address: row.address,
                obs: row.obs,
                city: row.city,
                state: row.state,
                postalCode: row.postalcode,
                paymentMethod: row.paymentmethod,
                cardExpire: row.cardexpire,
                cardNumber: row.cardnumber,
                cardHolderName: row.cardholdername,
                cardHolderDoc:  row.cardholderdoc,
                cardCvv: row.cardcvv,
                cardParc: row.cardparc,
                role: row.role
            }
        })
    
        return { data: users, error: null }        
    } catch (error:any) {
        return { data: null, error: error.message }                
    }
}

type ResultId = { data: number| null, error: string| null}
export const putUsuario = async (novoUsuario: User):Promise<ResultId> => {
    try {
        const res = await query(`insert into users (firstname, lastname, email, birthday, phone, username, password, address, city, state, postalCode, 
            cardExpire, cardNumber, paymentmethod, cardholdername, cardholderdoc, cardcvv, cardparc, role)
            values('${novoUsuario.firstName || ""}', '${novoUsuario.lastName || ""}',
                '${novoUsuario.email || ""}',
                '${novoUsuario.birthday?.toString().slice(0,10) || "1900-01-01"}',
                '${novoUsuario.phone || ""}','${novoUsuario.username || ""}',
                '${novoUsuario.password || ""}','${novoUsuario.address || ""}',
                '${novoUsuario.city || ""}','${novoUsuario.state || ""}',
                '${novoUsuario.postalCode || ""}', '${novoUsuario.cardExpire || ""}',
                '${novoUsuario.cardNumber || ""}','${novoUsuario.paymentMethod || ""}',
                '${novoUsuario.cardHolderName || ""}','${novoUsuario.cardHolderDoc || ""}',
                ${novoUsuario.cardCvv || 0},${novoUsuario.cardParc || 1},
                '${novoUsuario.role || ""}') RETURNING id
        `)
        
        const id = res.rows[0].id
        return { data: id, error: null }        
    } catch (error:any) {
        return { data: null, error: error.message }        

    }

}

type ResultTrueOrNull = { data: boolean| null, error: string| null}
export const updateUsuario = async (novoUsuario: User):Promise<ResultTrueOrNull> => {

    try {
        await query(`update users set 
            firstname='${novoUsuario.firstName || ""}', lastname='${novoUsuario.lastName || ""}', 
            birthday='${novoUsuario.birthday?.toString().slice(0,10) || "1900-01-01"}', 
            phone='${novoUsuario.phone || ""}', username='${novoUsuario.username || ""}',
            address='${novoUsuario.address || ""}', city='${novoUsuario.city || ""}', 
            state='${novoUsuario.state || ""}', postalCode='${novoUsuario.postalCode || ""}', 
            cardExpire='${novoUsuario.cardExpire || ""}', cardNumber='${novoUsuario.cardNumber || ""}',
            obs='${novoUsuario.obs || ""}',cardholdername='${novoUsuario.cardHolderName || ""}',
            cardholderdoc='${novoUsuario.cardHolderDoc || ""}',cardcvv=${novoUsuario.cardCvv || 0},
            cardparc=${novoUsuario.cardParc || 1}, paymentmethod='${novoUsuario.paymentMethod || ""}'
            where id =${novoUsuario.id}`)

        return { data: true, error: null }        
    } catch (error:any) {
        return { data: null, error: error.message }        

    }
}

export const updateSenha = async ({ id, novaSenha }:{ id:number, novaSenha:string }):Promise<ResultTrueOrNull> => {

    try {
        const res = await query(`update users set password='${novaSenha}' 
            where id=${id}`)

        return { data: true, error: null }        
    } catch (error:any) {
        return { data: null, error: error.message }        

    }
}

