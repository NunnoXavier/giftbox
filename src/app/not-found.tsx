import BtnVoltar from "@/components/genericos/ BtnVoltar"
import Link from "next/link"

const NotFound = () => {
    return (
        <div className="h-dvh flex items-center justify-center">
            <section>
                <h1 className="text-4xl text-texto">Ops...</h1>
                <p className="text-2xl text-texto">Este endereço que você digitou não existe!</p>
                <p className="text-lg text-texto ">Você pode tentar revisar a URL, ir direto para a 
                    <span>{" "}</span>
                    <Link href="/" className="text-texto2 hover:underline">
                        página Inicial
                    </Link>
                    <span>{" "}</span>
                    ou voltar para a{" "} 
                    <BtnVoltar> página anterior</BtnVoltar>
                </p>

            </section>
        </div>
    )
}

export default NotFound