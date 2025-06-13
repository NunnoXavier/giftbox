'use client'

import Timer from "@/components/genericos/timer/timer"
import { useState } from "react"

const BotaoEnviarConfirmacao = ({action}:{action: () => Promise<boolean>}) => {
    const [loading, setLoading] = useState(false)
    const [reenviar, setReenviar] = useState(true)

    const timer = Timer((time) => {
        if(time && time >= 60) {
            setReenviar(true)
            timer.stop()
        }
    })
    const timerValue = timer.time

    const handleClick = async () => {
        try {
            setLoading(true)
            setReenviar(false)
            timer.start()
            const resp = await action()
            if(!resp) {
                alert('Erro ao enviar email')
                setReenviar(true)
                return
            }

            
            
        } catch (error) {
            
        }        
    }
    
    return (
            <button 
                className={`${reenviar?'bg-blue-600 hover:bg-blue-500' : 'bg-gray-400'} 
                px-4 py-2  text-white rounded-2xl`}
                onClick={handleClick}
                disabled={!reenviar}
            >
                {  
                    reenviar ?
                    'Enviar email de confirmação' :
                    (<span>{`Enviar novamente em ${60 - timerValue} segundos`}</span>)
                }

            </button>        
    )

}
export default BotaoEnviarConfirmacao