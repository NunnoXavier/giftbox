import { ReactNode, useEffect, useState } from "react"

const ContainerAlerta = ({ children, visivel }:{ children?:ReactNode, visivel?:boolean }) => {

    const [ open, setOpen ] = useState(true)

    useEffect(() => {
        setOpen(visivel? true : false)
    },[])
    
    
    return (
        <div className={`${open? 'block': 'hidden'}flex flex-col space-y-2 absolute top-20 left-1/2 md:left-13/15 -translate-x-1/2 bg-amber-200/50 z-0`}>
            { children }
        </div>

    )
}

export default ContainerAlerta