'use client'

import { createQuerySacola } from "../../localCache/SacolaStore"

const AlertaSacola = ({className}:{className?: string}) => {
    const { data } = createQuerySacola()

    const temItemNaSacola = data? (data.length > 0) : false 

    return (
       <div className={`${className} ${ temItemNaSacola? 'block' : 'hidden' } absolute rounded-full w-4 h-4 bg-texto2 z-0 animate-ping`}></div>
    )
}

export default AlertaSacola