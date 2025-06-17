'use client'

import { dividerClasses } from "@mui/material"
import { X } from "lucide-react"
import { ReactNode, useEffect, useState } from "react"


const Alerta = ({ children, visivel, indice }:{ children?:ReactNode,titulo?:string, visivel?:boolean, indice:number  }) => {
    const [ open, setOpen ] = useState(true)
    const [ offset, setOffset ] = useState(1000)
    
    const TOP = 90

    useEffect(() => {
        //setOpen(visivel? true : false)        
        animacaoInicio()
    },[])

    useEffect(() => {
        if(open){
            setOffset(indice * TOP)
        }else{
            setOffset(-1000)
        }
        
    },[open])


    const animacaoInicio = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('animacaoInicio')
                setOffset(indice * TOP)
                resolve(true)
            }, 1000)
        })
    }

    const close = () => {
        setOpen(false)
    }

    return (
            <div className={`${open? 'opacity-100 ': 'opacity-0 '} z-10 fixed 
                bg-white/90 text-texto shadow-md right-2
                w-md h-20 rounded-lg transition-all duration-1000 ease-in-out`}
            style={{ top: `${offset + 16}px` }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <div className="px-2">
                            {children}
                        </div>
                    </div>

                    <X size={20} className="m-2 cursor-pointer" onClick={ () => close() }/> 
                </div>
            </div>
    )
}

export default Alerta