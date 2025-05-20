'use server'

import { revalidateTag } from "next/cache"

export const atualizarProdutosAction = async () => {
    revalidateTag('produtos')
}