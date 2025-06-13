import { actionEnviarEmail } from "@/actions/usuarios/actionEnviarEmail"
import BotaoEnviarConfirmacao from "./BotaoEnviarConfirmacao"
import { actionObterToken } from "@/actions/usuarios/actionObterToken"

const ConfirmarCadastro = async () => {
    
    const enviarEmailConfirmacao = async () => {
        'use server'

        const token = (await actionObterToken()).header.Cookie
        return await actionEnviarEmail('Boas Vindas', `                
            <p><strong>Bem vindo(a) a comunidade Si Giftbox!</strong></p>
            <p>Agora voc&ecirc; pode aproveitar toda a nossa plataforma e ofertas exclusivas!</p>
            <p>Confirme o recebimento deste email <a href="http://localhost:3000/confirmacao/${token}" target="_blank">clicando aqui</a>.</p>
            <p>&nbsp;</p>
            <p>Atenciosamente,</p>
            <p><span style="color: #ff00ff;"><em><strong>Si</strong></em></span> <strong>Giftbox</strong></p>
        `)
    }    

    return (
        <section className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-center">Confirmar Cadastro</h1>
            <div className="flex flex-col w-sm md:w-2xl gap-4">
                <div className="text-center">
                    <p>Seu cadastro foi realizado com sucesso!</p>
                    <p>Clique em "enviar email de confirmação" e verifique seu email para confirmar o cadastro.</p>
                </div>
                <BotaoEnviarConfirmacao action={enviarEmailConfirmacao} />
            </div>
        </section>
    )
}

export default ConfirmarCadastro