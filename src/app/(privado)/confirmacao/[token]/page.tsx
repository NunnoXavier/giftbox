import { actionVerificarToken } from "@/actions/usuarios/actionVerificarToken"
import Link from "next/link"

const Confirmacao = async ({ params }: { params: Promise<{ token: string }> }) => {
    const token = (await params).token

    const verificarToken = await actionVerificarToken(token)
    
    if(!verificarToken) {
        return (
            <section className="flex flex-col items-center gap-4 h-dvh">
                <h1 className="text-2xl font-bold text-center">Confirmar Cadastro</h1>
                <div className="flex flex-col w-sm md:w-2xl gap-4">
                    <div className="text-center">
                        <p>Ocorreu um erro ao confirmar o cadastro, tente mais tarde.</p>
                        <p className="mt-10">
                            <Link href="/" className="border px-4 py-2 bg-texto-link hover:bg-texto-link-claro text-white rounded-2xl">Ir para Ofertas</Link>
                        </p>
                    </div>
                </div>
            </section>
        )    
    }

    return (
        <section className="flex flex-col items-center gap-4 h-dvh">
            <h1 className="text-2xl font-bold text-center">Confirmar Cadastro</h1>
            <div className="flex flex-col w-sm md:w-2xl gap-4">
                <div className="text-center">
                    <p>Seu cadastro foi confirmado com sucesso!</p>
                    <p>Agora você pode aproveitar toda a nossa plataforma e ofertas exclusivas!</p>
                    <p className="mt-10">
                        <Link href="/" className="border px-4 py-2 bg-texto-link hover:bg-texto-link-claro text-white rounded-2xl">Ir para Ofertas</Link>
                    </p>
                </div>
            </div>
        </section>
    )

}

export default Confirmacao