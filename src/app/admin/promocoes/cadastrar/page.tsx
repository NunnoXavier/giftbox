import { actionInserirPromocao } from "@/actions/admin/promocoes/actionInserirPromocao"
import { actionUploadImagem } from "@/actions/formActions/actionUploadImagem"
import Form from "@/components/admin/promocoes/Form"
import BtnVoltar from "@/components/genericos/ BtnVoltar"
import { Undo2 } from "lucide-react"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export const metadata = {
    title: 'GiftBox - Administração',
    description: 'GiftBox - Administração',
}

const Promocoes = async () => {

    const salvarBanner = async (formData: FormData): Promise<void> => {
        'use server'
        
        const caminhoArquivo = await actionUploadImagem(formData)

        if(!caminhoArquivo){            
            return
        }

        revalidateTag('promocoes')

        const novaPromocao = await actionInserirPromocao({ 
            title: formData.get('nome') as string, 
            banner: caminhoArquivo,
            createdAt: new Date(formData.get('dataInicial') as string),
            finalDate: new Date(formData.get('dataFinal') as string),    
        })

        if(novaPromocao?.id && novaPromocao?.id > 0){
            redirect(`/admin/promocoes/editar/${novaPromocao.id.toString()}`)
        }        
    }   


    return (    
        <div className="w-full h-dvh flex flex-col items-center justify-center gap-5">
            <h1>Promoções</h1>
            <section className="w-sm md:w-2xl md:min-h-96 flex flex-col items-center 
                justify-center gap-5 bg-white rounded-lg shadow-lg p-5">
                <h1 className="text-xl font-semibold">Si Giftbox - Criar Promoção</h1>
                <Form action={salvarBanner} />
                <div className="w-full flex items-center justify-between">
                    <BtnVoltar><Undo2 /></BtnVoltar>
                    <div></div>
                </div>
            </section>
        </div>
    )
}

export default Promocoes