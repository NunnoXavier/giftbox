'use client'
import { CheckCheck } from 'lucide-react'

const BtnPagamento = ({ enabled }: { enabled?: boolean }) => {
    return (
        <div className="flex flex-col gap-2">
            {
                enabled ?
                    <a href={`/checkout`}
                        className="flex rounded-lg gap-2 justify-center
                    bg-texto2 text-white text-lg w-full py-2
                    hover:bg-borda2"
                    >
                        <CheckCheck />
                        Confirmar Pedido
                    </a>
                    :
                    <button
                        className="flex rounded-lg gap-2 justify-center
                    bgtexto-label text-white text-lg w-full py-2
                    hover:bg-borda0"
                    >
                        <CheckCheck />
                        Confirmar Pedido
                    </button>
            }
        </div>
    )
}

export default BtnPagamento