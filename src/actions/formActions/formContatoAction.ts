'use server'

import { Message } from "@/types/types"

export const actionSendMessage = async (formData: FormData) => {

    const newMessage: Message = {
        createdAt: new Date(),
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string
    }

    const res = await fetch('http://localhost:3000/api/mensagens', {
        method: 'POST',
        body: JSON.stringify(newMessage)
    })
    return res.json()
}