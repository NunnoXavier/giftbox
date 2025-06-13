'use client'

import { Loader2 } from "lucide-react"

const ButtonCriar = ({ loading }: { loading?: boolean }) => {

    return (
        <button 
            type="submit"
            disabled={loading}            
            className="bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2"
        >
            {
                loading ?
                    <Loader2 className="animate-spin" />
                    :
                    "Salvar"
            }

        </button>
    )
}

export default ButtonCriar