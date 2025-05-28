'use server'

import { Order } from "@/types/types"

export const actionPagar = async (pedido: Order):Promise<{ data:boolean|null, error:string|null }> => {
    try {
        const res = await fetch('http://localhost:3000/api/mock',{
            method: 'POST',
            body: JSON.stringify(true)
        })
        
        const { data:result, error:errorResult} = await res.json()
        
        if(errorResult){
            console.log(errorResult)
            return { data:null, error:errorResult}
        }

        return { data:result, error:null}

    } catch (error:any) {
        console.log(error.message)
        return { data:null, error:error.message}
    }
}