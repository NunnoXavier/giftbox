
import FormContato from "@/components/FormContato/FormContato"
import Image from "next/image"

const Contato = () => {

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-transparent">
      {/* Lado esquerdo - branding */}
      <div className="bg-transparent flex flex-col justify-center items-center p-10 text-center">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-4">Fale com a gente 💌</h1>
        <p className="text-texto text-lg max-w-md mb-4">
          Tem dúvidas, sugestões ou quer montar uma giftbox personalizada? Estamos aqui para ouvir você.
        </p>
        <p className="italic text-pink-800 text-base max-w-md mb-6">
          “Cada mensagem é um passo para criarmos juntos algo especial.”
        </p>
        <Image
          src="/images/atendimento-ao-cliente.webp"
          alt="Atendimento com carinho"
          className="w-3/4 max-w-sm rounded-xl shadow-md"
          width={500}
          height={500}
        />
        <div className="mt-8 text-sm text-texto">
          <p>📧 contato@sigiftbox.com.br</p>
          <p>📱 WhatsApp: (11) 98020-5438</p>
          <p>📍 São Paulo, SP</p>
        </div>
      </div>

      {/* Lado direito - formulário */}
      <div className="flex items-center justify-center px-6 py-12 bg-transparent">
        <div className="bg-white border border-borda rounded-xl shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl text-center font-bold text-texto mb-6">Envie sua mensagem</h2>

          <FormContato />
        </div>
      </div>
    </div>
  )
}

export default Contato
