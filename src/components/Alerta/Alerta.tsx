'use client'

import { X } from "lucide-react"
import { ReactNode, useEffect, useState } from "react"

const Alerta = ({ children,titulo, visivel, indice }:{ children?:ReactNode,titulo?:string, visivel?:boolean, indice:number  }) => {
    const [ open, setOpen ] = useState(true)

    const offset = indice * 130 

    useEffect(() => {
        setOpen(visivel? true : false)
    },[])

    return (
        <div className={`${open? 'top-10 opacity-100': '-top-50 opacity-0'}  absolute bg-white/90 left-1/2 md:left-10/12 -translate-x-1/2  w-md h-30 border border-red-500/50 rounded-lg transition-all duration-700 ease-in-out`}
        style={{ top: `${offset + 16}px` }}
        >
            <X size={15} className="absolute m-2 right-0 cursor-pointer" onClick={ () => setOpen(false) }/> 
            <div className="font-semibold px-2 py-1">
                <h1>{titulo}</h1>
            </div>
            <div className="px-2">
                {children}
            </div>
        </div>
    )
}

export default Alerta