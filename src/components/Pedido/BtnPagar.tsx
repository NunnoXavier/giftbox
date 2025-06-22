'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Button from "../genericos/Buttons/Button"

type BtnPagarProps = {
    fnPagar: () => Promise<boolean | null> 
    status: string
}

const BtnPagar = ({ fnPagar, status }: BtnPagarProps) => {
    const [ pagando, setPagando ] = useState(false)
    const [ sucesso, setSucesso ] = useState(false)
    const [ erro, setErro ] = useState(false)
    const router = useRouter()

    const handlePagar = async () => {
        setPagando(true)
        const res = await fnPagar()
        if(!res){
            setPagando(false)
            return
        }
        
        const pagtoOk = res
        setPagando(false)
        
        if(!pagtoOk) {
            router.push('/falha-pagto')
        }

        sessionStorage.clear() // apaga o cache do pedido e pagamento
        localStorage.removeItem('sacola')
        router.push('/confirmacao-pagto')
    }    
          
    if(status === 'paid'){
        return <h1 className="bg-gray-400 w-full py-2 text-center rounded-full text-green-200">Pedido em Preparação</h1>
    }

    if(status === 'sent'){ 
        return <h1 className="bg-gray-400 w-full py-2 text-center rounded-full text-blue-200">Pedido Enviado</h1>
    }
    if(status === 'canceled'){
        return <h1 className="bg-gray-400 w-full py-2 text-center rounded-full text-red-200">Pedido Cancelado</h1>
    }
    if(status === 'received'){
        return <h1 className="bg-gray-400 w-full py-2 text-center rounded-full text-gray-200">Pedido Recebido</h1>
    }
    if(status === 'expired'){
        return <h1 className="bg-gray-400 w-full py-2 text-center rounded-full text-gray-200">Pedido Expirado</h1>
    }    
    
    return (        
        <Button   
            className="w-full"              
            onClick={ () => handlePagar() }
            error={erro}
            sucess={sucesso}
            loading={pagando}
            setError={setErro}
            setSucess={setSucesso}
        >
            Pagar
        </Button>
    )
}

export default BtnPagar