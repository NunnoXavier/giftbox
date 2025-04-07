'use client'

import { ShoppingBag } from "lucide-react"
import MenuItem from "./MenuItem"
import { createQuerySacola } from "../Store/SacolaStore"

const MenuSacola = () => {
    const { data } = createQuerySacola()

    const temItemNaSacola = data? (data.length > 0) : false 

    return (
    <MenuItem className="relative" href="/sacola" label='sacola'>
        <div className={`${ temItemNaSacola? 'block' : 'hidden' } absolute rounded-full w-4 h-4 bg-violet-800 left-1/2 top-0.5 z-0 animate-ping`}></div>
        <ShoppingBag className="z-1" size={25}/>
    </MenuItem>        
    )
}


export default MenuSacola