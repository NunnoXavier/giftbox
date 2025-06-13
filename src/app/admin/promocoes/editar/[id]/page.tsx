import { actionEditarPromocao } from "@/actions/admin/promocoes/actionEditarPromocao"
import { actionUploadImagem } from "@/actions/formActions/actionUploadImagem"
import Form from "@/components/admin/promocoes/Form"
import BtnVoltar from "@/components/genericos/ BtnVoltar"
import { fetchPromocao } from "@/uncachedFetchs/fetchPromocao"
import { Undo2 } from "lucide-react"
import { revalidateTag } from "next/cache"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export const metadata = {
    title: 'GiftBox - Administração',
    description: 'GiftBox - Administração',
}

const Promocoes = async ({  params }: { params: Promise<{ id: string }> }) => {

    const { id } = await params

    if( isNaN(Number(id)) ){
        return (
            <div className="w-full h-dvh flex flex-col items-center justify-center gap-5">
                <h1>ID Inválido</h1>
            </div>
        )
    }

    const promocao = await fetchPromocao(Number(id))

    const atualizarPromo = async (formData: FormData): Promise<void> => {
        'use server'
        
        
        const caminhoArquivo = await actionUploadImagem(formData)

        if(!caminhoArquivo){            
            return
        }

        revalidateTag('promocoes')

        const novaPromocao = await actionEditarPromocao({
            id: Number(id),
            title: formData.get('nome') as string, 
            banner: caminhoArquivo,
            createdAt: new Date(formData.get('dataInicial') as string),
            finalDate: new Date(formData.get('dataFinal') as string),
        })

        if(novaPromocao?.id && novaPromocao?.id > 0){
            redirect(`/admin/promocoes/editar/${novaPromocao.id.toString()}`)
        }
    }   

    if(!promocao){
        return (
            <div className="w-full h-dvh flex flex-col items-center justify-center gap-5">
                <h1>Promoção não encontrada</h1>
            </div>
        )
    }

    const caminhoBanner = promocao.banner    

    return (    
        <div className="w-full min-h-dvh flex flex-col items-center justify-center gap-5">
            <h1>Promoções</h1>
            <section className="w-sm md:w-2xl md:min-h-96 flex flex-col items-center 
                justify-center gap-5 bg-white rounded-lg shadow-lg p-5">
                <h1 className="text-xl font-semibold">Si Giftbox - Criar Promoção</h1>
                <Form action={atualizarPromo} initialData={promocao} />
                <div className="w-full flex items-center justify-between">
                    <BtnVoltar><Undo2 /></BtnVoltar>
                    <Link 
                        href={`/admin/promocoes/editar/${id}/produtos`} 
                        className="text-sm text-texto-link"
                    >
                        Adicionar Descontos
                    </Link>
                </div>
            </section>
            <div className="w-full h-40 md:h-60 lg:h-96 relative">
                <Image 
                    src={caminhoBanner}
                    alt="escolha um banner"
                    fill
                />
            </div>
        </div>
    )
}

export default Promocoes