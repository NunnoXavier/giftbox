'use client'
import { Search } from 'lucide-react'
import { useState } from 'react'

const BuscarProduto = ({ className, mobile }: { className?:string, mobile?:boolean }) => {
    const [ open, setOpen ] = useState(false)
    const [ valor, setValor ] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (valor.length > 0) {
                window.location.href = `/produtos/${valor}`
            }
        }
    }

    return (
        <div className={`${className} ${open? 'w-44' : 'w-0'} 
            flex md:border md:border-texto rounded-2xl h-9 px-2 content-center 
            transition-all duration-300 md:w-full text-sm placeholder-zinc-200`}>
            <input type="search" 
                className='border-none focus:outline-none  w-full  text-sm '
                placeholder={`${!mobile || open? 'Buscar Produtos...' : ''}`}
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                onKeyDown={ handleKeyDown }
                />
                <button
                    onClick={() => mobile? setOpen(!open) : ''}
                ><Search strokeWidth={1} /></button>
      </div>        
    )
}

export default BuscarProduto