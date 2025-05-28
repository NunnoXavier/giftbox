'use client'

import { Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

type BtnPagarProps = {
    fnPagar: () => Promise<{ data: boolean | null, error:string|null }|undefined> 
}

const BtnPagar = ({ fnPagar }: BtnPagarProps) => {
    const [ pagando, setPagando ] = useState(false)
    const router = useRouter()

    const handlePagar = async () => {
        setPagando(true)
        const res = await fnPagar()
        if(!res){
            setPagando(false)
            return
        }
        const { data:pagtoOk, error } = res
        setPagando(false)
        if(error){
            console.log({ data: pagtoOk, error })
            //router.push('/error-001')            
        }
        if(pagtoOk === true) {
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