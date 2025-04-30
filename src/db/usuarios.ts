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
    
        const users:User[] = rows.map((row) => {
            return {
                id: row.id,
                firstName: row.firstname,
                lastName: row.lastname,
                email: row.email,
                phone: row.phone,
                username: row.username,
                password: row.password,
                address: row.address,
                obs: row.obs,
                city: row.city,
                state: row.state,
                postalCode: row.postalcode,
                cardExpire: row.cardexpire,
                cardNumber: row.cardnumber,
                cardHolderName: row.cardholdername,
                cardHolderDoc:  row.cardholderdoc,
                cardCvv: row.cardcvv,
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
        const res = await query(`insert into users (firstname, lastname, email, phone, username, password, address, city, state, postalCode, 
            cardExpire, cardNumber,cardholdername, cardholderdoc,cardcvv, role)
            values('${novoUsuario.firstName || ""}', '${novoUsuario.lastName || ""}','${novoUsuario.email || ""}','${novoUsuario.phone || ""}',
                    '${novoUsuario.username || ""}','${novoUsuario.password || ""}','${novoUsuario.address || ""}','${novoUsuario.city || ""}',
                    '${novoUsuario.state || ""}','${novoUsuario.postalCode || ""}', '${novoUsuario.cardExpire || ""}','${novoUsuario.cardNumber || ""}',
                    '${novoUsuario.cardHolderName || ""}','${novoUsuario.cardHolderDoc || ""}',
                    ${novoUsuario.cardCvv || 0},'${novoUsuario.role || ""}') RETURNING id
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
        const res = await query(`update users set 
            firstname='${novoUsuario.firstName || ""}', lastname='${novoUsuario.lastName || ""}', 
            phone='${novoUsuario.phone || ""}', username='${novoUsuario.username || ""}',
            address='${novoUsuario.address || ""}', city='${novoUsuario.city || ""}', 
            state='${novoUsuario.state || ""}', postalCode='${novoUsuario.postalCode || ""}', 
            cardExpire='${novoUsuario.cardExpire || ""}', cardNumber='${novoUsuario.cardNumber || ""}',
            obs='${novoUsuario.obs || ""}',cardholdername='${novoUsuario.cardHolderName || ""}',
            cardholderdoc='${novoUsuario.cardHolderDoc || ""}',cardcvv=${novoUsuario.cardCvv || 0}
            where id =${novoUsuario.id}`)
        
        return { data: true, error: null }        
    } catch (error:any) {
        return { data: null, error: error.message }        

    }

}

