'use client'

import { Loader2 } from "lucide-react"
import { useState } from "react"

type BtnPagarProps = {
    fnPagar: () => Promise<any> 
}

const BtnPagar = ({ fnPagar }: BtnPagarProps) => {
    const [ pagando, setPagando ] = useState(false)

    const handlePagar = async () => {
        setPagando(true)
        await fnPagar()
        setPagando(false)
    }

    return (
        <div className="w-1/3 overflow-hidden bg-violet-500 text-white text-center rounded-full">
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