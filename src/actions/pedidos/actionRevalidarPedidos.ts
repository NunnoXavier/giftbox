'use server'

import { revalidateTag } from "next/cache"

export const actionRevalidarPedidos = async (idUser:number) => {

    revalidateTag(`pedidos`)
    revalidateTag(`pedidos-${idUser}`)
}