'use client'

import { actionSalvarUsuario } from "@/actions/usuarios/actionSalvarUsuario"
import { User } from "@/types/types"

const FormasDePagto = ({initUser}:{initUser:User}) => {

    return (
        <div className="bg-white flex flex-col">
            <div className="flex gap-2">
                <button 
                    className={`${initUser.paymentMethod === 'P'? 'bg-texto2 text-white':'bg-white text-texto'} px-2 w-1/2 border border-borda rounded-full`}
                    onClick={() => { 
                        actionSalvarUsuario({...initUser, paymentMethod: 'P' })
                    }}
                >
                    PIX
                </button>
                <button 
                    className={`${initUser.paymentMethod === 'C'? 'bg-texto2 text-white':'bg-white text-texto'} px-2 w-1/2 border border-borda rounded-full`}
                    onClick={() => {
                        actionSalvarUsuario({...initUser, paymentMethod: 'C' })
                    }}
                >
                    Cartão
                </button>
            </div>
        </div>
    )
}

export default FormasDePagto