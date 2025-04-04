'use client'

import { ShoppingBag } from "lucide-react"
import { useState } from "react"

const AdicionarSacola = () => {
const [qtde, setQtde] = useState("1")

    return (
        <div className="flex gap-2">
            <input 
                className=" bg-gray-100 outline-0 px-2 text-center appearance-none caret-violet-400 text-violet-400 focus:border focus:border-violet-400 w-14 h-14 rounded-lg" 
                type="number"
                value={qtde}
                onChange={(e) => setQtde(e.currentTarget.value) }
            />
            <button  
                className="flex-1 flex gap-2 justify-center place-items-center bg-violet-400 text-white px-5 rounded-xl"
                
            >
                <ShoppingBag /> Adicionar à Sacola
            </button>
        </div>        
    )
}

export default AdicionarSacola