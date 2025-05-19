
import { OrderPayment } from "@/types/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const createQueryPagto = () => {
    const fetchPagto = async():Promise<OrderPayment> => {
        const storage = sessionStorage.getItem('pagto')

        const pagto = storage? JSON.parse(storage) : {}
        return pagto
    }
    
    return  useQuery<OrderPayment>({
        queryKey: ['pagto'],
        queryFn: fetchPagto,
        placeholderData: keepPreviousData,
        notifyOnChangeProps: "all"
    })
}

export const fetchAddDadosPagto = async(dadosPagto:OrderPayment):Promise<OrderPayment> => {
    const storage = sessionStorage.getItem('pagto')
    const dadosAntigos = storage? JSON.parse(storage) : {}
    sessionStorage.setItem('pagto', JSON.stringify({ 
        ...dadosAntigos, 
        cardCvv: dadosPagto.cardCvv,
        cardExpire: dadosPagto.cardExpire,
        cardHolderDoc: dadosPagto.cardHolderDoc,
        cardHolderName: dadosPagto.cardHolderName,
        cardNumber: dadosPagto.cardNumber,
        paymentMethod: dadosPagto.paymentMethod,
        parc: dadosPagto.parc 
    }))

    return dadosPagto
}