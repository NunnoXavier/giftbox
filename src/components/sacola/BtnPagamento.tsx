'use client'
import { CheckCheck } from 'lucide-react'

const BtnPagamento = () => {
    return (
        <div className="bg-white flex flex-col gap-2">
            <a
                href='/checkout'
                className="flex rounded-lg gap-2 justify-center 
                    bg-violet-600 text-white text-lg w-full py-2 
                    hover:bg-violet-400"
            >
                <CheckCheck/>
                Confirmar Pedido
            </a>
        </div>
    )
}

export default BtnPagamento