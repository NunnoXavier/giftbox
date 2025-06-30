import { ReactNode } from "react"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Metadata } from "next"

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
    title: 'Si Giftbox - Login',
    description: 'Faça login para criar ou gerenciar suas giftboxes.',
}


const LayoutLogin = ( { children }: { children: ReactNode } ) => {
    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-transparent">            
            {/* PARTE 1: LOGO E TEXTO */}
            <div className="bg-transparent flex flex-col justify-evenly items-center p-10 text-center">
                <Image
                    src="/logo-novo-cinza.svg"
                    alt="Giftbox"
                    className="w-3/4 max-w-sm rounded-xl "
                    width={500}
                    height={500}
                />
                <h1 className="text-4xl font-extrabold text-texto2 mb-4 text-shadow-lg/5">Bem-vindo à Si Giftbox</h1>
                <p className="text-texto text-lg max-w-md mb-6">
                Presentes sofisticados para momentos especiais. Faça login para criar ou gerenciar suas giftboxes.
                </p>
                <p className="italic text-purple-800 text-base max-w-md mb-6 text-shadow-lg/5">
                “Cada presente é um gesto de amor — entregue com cuidado, recebido com emoção.”
                </p>
            </div>
        
            {/* PARTE 2: FORMULÁRIO */}
            <div className="bg-transparent min-h-screen flex flex-col justify-center items-center p-10 text-center">
                {children}
            </div>
        </div>
    )
}

export default LayoutLogin