'use client'

import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

type BtnPagarProps = {
    fnPagar: () => Promise<boolean> 
}

const BtnPagar = ({ fnPagar }: BtnPagarProps) => {
    const [ pagando, setPagando ] = useState(false)
    const router = useRouter()

    const handlePagar = async () => {
        setPagando(true)
        const result = await fnPagar()
        setPagando(false)
        if(result) {
            sessionStorage.clear() // apaga o cache do pedido e pagamento
            localStorage.removeItem('sacola')
            router.push('/confirmacao-pagto')
        }else{
            router.push('/falha-pagto')
        }        
    }

    return (
        <div className="w-1/3 overflow-hidden bg-texto2 text-white text-center rounded-full">
            <button 
                className="flex w-full px-4 justify-center items-center" 
                onClick={ () => handlePagar() }>
                { 
                    pagando? 
                        (<Loader2 className="animate-spin"/>)
                        : 'Pagar' 
                }
            </button>
        </div>         
    )
}

export default BtnPagar