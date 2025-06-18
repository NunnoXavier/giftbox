import FormLogin from "@/components/Login/FormLogin"
import Image from "next/image"

const Login = () => {

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-transparent">
      
      {/* Lado esquerdo - branding */}
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

      {/* Lado direito - login */}
      <div className="flex items-center justify-center px-6 bg-transparent">
        <FormLogin />
      </div>
    </div>
  )
}

export default Login
