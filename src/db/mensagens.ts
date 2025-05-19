import { Message } from "@/types/types"
import query from "./postgres"


export const insertMessage = async (message: Message): Promise<{ data: Message|null, error: string|null }> => {
    try {
        const sql = `
            INSERT INTO messages(
                createdat,
                name,
                email,
                subject,
                message
            ) VALUES (
                $1, $2, $3, $4, $5
            )
                RETURNING *
        `
        const result = await query(sql, [
            message.createdAt.toString().slice(0, 10),
            message.name,
            message.email,
            message.subject,
            message.message
        ])

        const newMessage:Message = result.rows.map((row:any) => ({
            id: row.id,
            createdAt: row.createdat,
            name: row.name,
            email: row.email,
            subject: row.subject,
            message: row.message
        }))[0]

        return { data: newMessage, error: null }
    } catch (error:any) {
        return { data: null, error: error.message }
    }
}

