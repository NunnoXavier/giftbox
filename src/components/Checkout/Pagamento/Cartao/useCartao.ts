import { User } from "@/types/types"
import { useState } from "react"
import { actionSalvarUsuario } from "@/actions/usuarios/actionSalvarUsuario"


const useCartao = (initUser:User) => {
    const [ usuario, setUsuario ] = useState(initUser)
    const [ parc, setParc ] = useState(1)
    const [ salvando, setSalvando ] = useState(false)
    const [ salvo, setSalvo ] = useState(false)    

    const salvar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(salvo) return
        try {
            const formData = new FormData(e.currentTarget)
            const cardHolderDoc = formData.get('cardHolderDoc') as string
            const cardHolderName = formData.get('cardHolderName') as string
            const cardNumber = formData.get('cardNumber') as string
            const cardExpire = formData.get('cardExpire') as string
            const cardCvv = formData.get('cardCvv') as string
            const paymentMethod = formData.get('paymentMethod') as string
            const parc = formData.get('parc') as string

            const newUser:User = {
                ...usuario,
                cardCvv: Number(cardCvv),
                cardExpire: cardExpire,
                cardHolderDoc: cardHolderDoc,
                cardHolderName: cardHolderName,
                cardNumber: cardNumber,
                paymentMethod: paymentMethod,
                cardParc: Number(parc)
            }   

            console.log(newUser)

            setSalvando(true)
            await actionSalvarUsuario(newUser)

        } finally{
            setSalvando(false)  
            setSalvo(true)          
        }        
    }

    return {
        usuario,
        setUsuario,
        parc,
        setParc,
        salvar,
        salvando,
        setSalvando,
        setSalvo,
        salvo
    }

}

export default useCartao

