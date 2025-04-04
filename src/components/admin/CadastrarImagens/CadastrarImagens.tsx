'use client'

import { Product, ImageDTO } from "@/types/types"
import Campo from "../CadastrarProduto/Campo"
import { useState } from "react"
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react"
import Modal from '../../Modal/Modal'
import { ReactFormState } from "react-dom/client"

const CadastrarImagens = ({produtos}:{produtos:Product[]}) => {
    const [ idProduto, setIdProduto ] = useState("")
    const [ posImagem, setPosImagem ] = useState(0)
    const [ inserindo, setInserindo ] = useState(false)
    const [ file, setFile ] = useState<File|null>(null)

    
    const produto = produtos.find((p) => p.id === Number(idProduto))
    const imagens = produto?.images

    const incluir = async () => {
        setInserindo(true)
    }

    const salvarUrl = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            if(!file){
                alert('selecione um arquivo')
                return
            }
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch(`http://localhost:3000/api/protegido/imagens/upload`,{
                method: 'POST',
                // headers: {"Content-type": "Application-json"},
                body: formData
            })
           
            const { data: caminhoArquivo, error } = await res.json()

            if(error){
                console.log(error)
                return
            }

            const novaImagem:ImageDTO = {
                id: 0,
                idproduct: Number(idProduto),
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

            novaImagem.id = idImage
            console.log(novaImagem)
                        
            setInserindo(false)
        } catch (error:any) {
            console.log(error.message)            
        }
    }

    return (
        <div className="w-96 max-h-[460px] border border-gray-200 rounded-lg p-4">
            <Modal show={ inserindo } title='Inserir Imagem'>
                <form onSubmit={salvarUrl}>
                    <span className="my-2 text-center">Insira a URL da imagem:</span>
                    <input
                        id="file" 
                        type="file"
                        onChange={(e) => {
                            setFile(e.target.files && e.target.files[0])
                        }}
                    />
                    
                    <div className="flex gap-2">
                        <button 
                            className="border border-gray-400 text-gray-700 w-20 rounded-md"
                            onClick={() => setInserindo(false)}
                        >
                            Cancelar
                        </button>    
                        <input 
                            id="submit"
                            type="submit" 
                            className="bg-violet-500 text-white w-20 rounded-md"
                            value="OK"
                        />
                    </div>
                </form>
            </Modal>
            <h1 className="text-center font-bold text-lg text-gray-500">Cadastrar Imagens</h1>
            <div className="flex flex-col gap-y-2">
                <Campo
                    label='Cod: Produto'
                    inputType="input"
                    classWidth="w-10"
                    type="number"
                    value={idProduto}
                    changeFunction={(e) => setIdProduto(e)}
                >
                    <div className="flex-1 px-2 border border-gray-200 rounded-sm bg-gray-100 text-violet-500">
                        {produto?.title || 'não encontrado'}
                    </div>
                </Campo>

                <Campo 
                    label='url:'
                    inputType="textarea"
                    className="text-gray-600"
                    value={imagens && imagens[posImagem] && imagens[posImagem].url || ""}
                />
                <div className="flex h-56 border border-gray-200 rounded-md">
                    <img 
                        src={imagens && imagens[posImagem] && imagens[posImagem].url} 
                        alt="imgProduto" 
                    />
                </div>
                <div className="flex justify-between text-gray-600">
                    <button 
                        className="text-xs flex-start text-white bg-violet-500 px-2 rounded-md"
                        onClick={() => incluir()}
                    >
                        Incluir
                    </button>
                    <div>
                        <button
                            onClick={() => setPosImagem((p) => p = 0)}
                            >
                            <ChevronFirst />                        
                        </button>
                        <button
                            onClick={() => setPosImagem((p) => p - 1)}
                        >
                            <ChevronLeft  />
                        </button>
                        <button
                            onClick={() => setPosImagem((p) => p + 1)}
                        >
                            <ChevronRight  />
                        </button>
                        <button
                            onClick={() => imagens && setPosImagem((p) => p = imagens?.length-1)}
                        >
                            <ChevronLast  />
                        </button>
                    </div>
                    <button className="text-xs flex-start text-white bg-red-500 px-2 rounded-md">
                        Apagar
                    </button>                    
                </div>
            </div>
        </div>
    )
}

export default CadastrarImagens