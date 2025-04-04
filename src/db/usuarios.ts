import query from "./postgres"
import { User } from "@/types/types"

type getUsuariosProps = {campo?:string, valor?:any}

export const getUsuarios = async (props?: getUsuariosProps ):Promise<User[]> => {
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
            city: row.city,
            state: row.state,
            postalCode: row.postalcode,
            cardExpire: row.cartexpire,
            cardNumber: row.cardnumber,
            role: row.role
        }
    })

    return users
}

export const putUsuario = async (novoUsuario: User):Promise<any> => {
    try {
        const res = await query(`insert into users (firstname, lastname, email, phone, username, password, address, city, state, postalCode, cardExpire, cardNumber, role)
            values('${novoUsuario.firstName || ""}', '${novoUsuario.lastName || ""}','${novoUsuario.email || ""}','${novoUsuario.phone || ""}',
                    '${novoUsuario.username || ""}','${novoUsuario.password || ""}','${novoUsuario.address || ""}','${novoUsuario.city || ""}',
                    '${novoUsuario.state || ""}','${novoUsuario.postalCode || ""}', '${novoUsuario.cardExpire || ""}','${novoUsuario.cardNumber || ""}',
                    '${novoUsuario.role || ""}') RETURNING id
        `)
        
        const id = res.rows[0].id
        return res        
    } catch (error:any) {
        throw error.message
    }

}

