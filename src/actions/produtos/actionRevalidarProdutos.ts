'use server'

import { revalidateTag } from "next/cache"

export const actionRevalidarProdutos = async () => {
    revalidateTag('produtos')
}