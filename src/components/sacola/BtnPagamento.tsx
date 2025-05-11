'use client'
import { CheckCheck } from 'lucide-react'

const BtnPagamento = ({ enabled }: { enabled?: boolean }) => {
    return (
        <div className="flex flex-col gap-2">
            {
                enabled ?
                    <a href={`/checkout`}
                        className="flex rounded-lg gap-2 justify-center
                    bg-violet-600 text-white text-lg w-full py-2
                    hover:bg-violet-400"
                    >
                        <CheckCheck />
                        Confirmar Pedido
                    </a>
                    :
                    <button
                        className="flex rounded-lg gap-2 justify-center
                    bg-gray-400 text-white text-lg w-full py-2
                    hover:bg-gray-300"
                    >
                        <CheckCheck />
                        Confirmar Pedido
                    </button>
            }
        </div>
    )
}

export default BtnPagamento