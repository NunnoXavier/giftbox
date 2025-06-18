import FormVerificarEmail from '@/components/VerificarEmail/FormVerificarEmail'
import Image from 'next/image'

const VerificarEmail = () => {

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
                <div className="bg-white border border-borda rounded-lg p-8 text-center place-center w-md shadow-md">
                    <h1 className="text-xl text-texto m-2 font-bold">VERIFICAR EMAIL</h1>
                    <FormVerificarEmail />
                </div>
            </div>
        </div>
    )
}

export default VerificarEmail