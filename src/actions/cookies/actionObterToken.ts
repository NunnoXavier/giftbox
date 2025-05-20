'use server'

import { cookies } from "next/headers"

export const actionObterToken = async () => {
    try {
        const cookieStore = await cookies()
        const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")
        return { Cookie:`SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}` }
    } catch (error) {
        console.log(error)
        return { Cookie:"" }
    }
}
