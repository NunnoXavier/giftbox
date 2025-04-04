'use client'
import { Search } from 'lucide-react'
import { useState } from 'react'

const BuscarProduto = ({ className, mobile }: { className?:string, mobile?:boolean }) => {
    const [ open, setOpen ] = useState(false)

    return (
        <div className={`${className} flex md:border md:border-gray-700 rounded-2xl h-9 px-2 content-center  w-0 ${open? 'w-44' : ''} transition-all duration-300 md:w-[600px] text-sm placeholder-zinc-200`}>
            <input type="text" 
                className='border-none focus:outline-none  w-full  text-sm '
                placeholder={`${!mobile || open? 'Buscar Produtos...' : ''}`}/>
                <button
                    onClick={() => mobile? setOpen(!open) : ''}
                ><Search strokeWidth={1}/></button>
      </div>        
    )
}

export default BuscarProduto