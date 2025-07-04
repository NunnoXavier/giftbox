import { fetchProdutosAdmin } from "@/serverCache/fetchsProdutos"
import { ImageDTO } from "@/types/types"
import { revalidateTag } from "next/cache"
import DadosProduto from "./DadosProduto"
import { actionUploadImagem } from "@/actions/formActions/actionUploadImagem"

const CadastrarImagens = async () => {

    const produtos = await fetchProdutosAdmin()

    const salvarUrl = async(data: FormData) => {
        'use server'

        try {
            const file = data.get('file') as File
    
            if(!file || file.size === 0){
                return
            }
  
            const caminhoArquivo = await actionUploadImagem(data)

            if(!caminhoArquivo){
                console.log('erro ao salvar imagem')
                return
            }   

            const novaImagem:ImageDTO = {
                id: 0,
                idproduct: Number(data.get('id')),
                url: caminhoArquivo
            }
    
            const res2 = await fetch(`http://localhost:3000/api/protegido/imagens/cadastrar`,{
                method: 'POST',
                headers: {"Content-type": "Application-json"},
                body: JSON.stringify(novaImagem)
            })
    
            const { data:idImage, error:errorImage } = await res2.json()
            if(errorImage){
                console.log(errorImage)
                return
            }     
            
            revalidateTag('produtos')
        } catch (error:any) {
            console.log(error.message)            
        }
    }

    const apagar = async ({idImagem}:{idImagem:number}) => {
        'use server'

        const res = await fetch('http://localhost:3000/api/protegido/imagens/apagar',{
            method: 'DELETE',
            headers: {"Content-type": "Application-json"},
            body: JSON.stringify({id: idImagem})
        })

        const { data, error } = await res.json()
        if(!data){
            console.log(error)
        }

        revalidateTag('produtos')
    }

    return (
        <form action={salvarUrl} className="flex flex-col w-96 max-h-150 justify-between border border-borda bg-white rounded-lg p-4">
            <h1 className="font-semibold text-lg text-texto-label text-center">Imagens</h1>
            <DadosProduto produtos={ produtos } apagar={apagar}/> 
        </form>        
    )
}

export default CadastrarImagens
