'use server'

import { revalidateTag } from "next/cache"

export const actionRevalidarPreco = async () => {
    revalidateTag('estoque-produtos')
}