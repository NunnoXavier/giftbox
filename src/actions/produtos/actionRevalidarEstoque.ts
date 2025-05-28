'use server'

import { revalidateTag } from "next/cache"

export const actionRevalidarEstoque = async () => {
    revalidateTag('estoque-produtos')
}