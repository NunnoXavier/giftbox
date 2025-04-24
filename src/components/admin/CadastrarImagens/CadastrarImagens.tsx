import { fetchProdutos } from "@/cachedFetchs/fetchsProdutos"
import { ImageDTO } from "@/types/types"
import { revalidateTag } from "next/cache"
import DadosProduto from "./DadosProduto"
import { Pointer } from 'lucide-react'


const CadastrarImagens = async () => {

    const res = await fetchProdutos()
    const { data:produtos, error} = await res.json()
    if(!produtos){
        console.log(error)
    }    

    const salvarUrl = async(data: FormData) => {
        'use server'

        try {
            const file = data.get('file') as File
    
            if(!file || file.size === 0){
                return
            }
  
            const res = await fetch(`http://localhost:3000/api/protegido/imagens/upload`,{
                method: 'POST',
                body: data
            })
           
            const { data: caminhoArquivo, error } = await res.json()
    
            if(error){
                console.log(error)
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
        <form action={salvarUrl} className="flex flex-col w-96 max-h-150 justify-between border border-gray-200 bg-white rounded-lg p-4">
            <h1 className="font-semibold text-lg text-gray-500 text-center">Imagens</h1>
            <DadosProduto produtos={ produtos } apagar={apagar}/> 
        </form>        
    )
}

export default CadastrarImagens
