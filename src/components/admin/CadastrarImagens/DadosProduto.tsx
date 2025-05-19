'use client'

import { Product, Image } from "@/types/types"
import Imagem from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { MinusCircle as ApagarIcone, Pointer } from 'lucide-react'
import { useSearchParams } from "next/navigation"

const DadosProduto = (
    { produtos, apagar}:{ produtos:Product[], apagar:({idImagem}:{ idImagem:number } ) => Promise<void> }
) => {

    const [ id, setId ] = useState("")
    const [ posImagem, setPosImagem] = useState(0)
    const [ fileName, setFileName ] = useState("")

    const searchParams = useSearchParams()
    const paramId = searchParams.get('id')
    
    
    useEffect(() => {
        if(!paramId || Number(paramId) === 0){
            setId("")
            return
        }

        setId(paramId)
        
    },[searchParams])

    const changeId = (e: ChangeEvent<HTMLInputElement>) => {
        setId(e.currentTarget.value)
    }

    const produto = produtos.find((p) => p.id === Number(id))
    const images:Image[] = produto?.images? produto.images : []

    return (
        <div className="flex flex-col gap-2">
            <div className="gap-2 hidden">
                <span>ID:</span>
                <input
                    id="id"
                    name="id"
                    type="number"
                    className="border border-borda rounded-md px-2 w-10"
                    value={id}
                    onChange={ changeId }
                    readOnly
                /> 
                <div className="flex-1 rounded-lg border border-borda bg-background text-texto-link">
                    {produto?.title}
                </div>
            </div>            

            <div className="border content-center border-borda rounded-lg max-h-70 w-full h-70 overflow-hidden">
                {
                    produto && produto.images && produto.images.length > 0?
                    (<Imagem src={produto.images[posImagem].url} alt="" 
                        className="w-full" 
                        width={300}
                        height={300}
                    />)
                    :(<div className=" h-70"></div>)
                }                
            </div>
            <input readOnly className="text-sm" value={ images.length > 0 && images[posImagem].url || ""  } />
            
            <div className="flex gap-2 rounded-lg h-20 w-full overflow-hidden">
                {                    
                    produto?.images?.map((imagem, index) => {
                        return imagem.url? (
                            <div key={imagem.id} className="w-20 h-15 border border-borda rounded-lg relative"
                                onClick={() => setPosImagem(index)}
                            >
                                <Imagem src={imagem.url} alt="" 
                                className="w-full h-15" 
                                width={30}
                                height={30}
                                />
                                <ApagarIcone size={15} fill="red" 
                                    className="absolute top-1 right-1 text-white"
                                    onClick={() => apagar({
                                        idImagem: produto.images && produto.images[index] && produto.images[index].id || 0
                                    })}
                                />
                            </div>
                        ):(
                            <div key={imagem.id} className="w-20 h-15 border border-borda rounded-lg relative"></div>
                        )
                    })

                }                
            </div>

            <div className="flex flex-col border border-borda rounded-lg p-2">
                <h1 className="text-center font-semibold ">Nova Imagem</h1>

                <div className="flex flex-col text-texto-label">
                    <div className="flex flex-nowrap gap-2 my-2 text-center">
                        <span className="whitespace-nowrap">Clique aqui</span>
                        <Pointer className="rotate-180 animate-bounce"/> 
                        <span className="whitespace-nowrap">para selecionar uma imagem:</span>
                    </div>
                    <div className="border border-borda rounded-md relative">
                        <input
                            id="file"
                            name="file"
                            type="file"
                            className="border border-borda rounded-md px-2 opacity-0 z-10 relative"
                            accept="image/png, image/jpg, image/jpeg, image/svg, image/webp, image/avif"
                            onChange={(e) => setFileName(e.target.files && e.target.files.length > 0? e.target.files[0].name : '')}
                            required                        
                        />
                        <span className="absolute top-0 left-1 z-0">{ fileName }</span>
                    </div>
                </div>            

                <div className="flex gap-2 justify-end pt-2">
                    <input 
                        id="submit"
                        type={ fileName !== ''? 'submit': 'button' } //se não tiver arquivo muda o tipo para button, para não funcionar a ação do form
                        className={`${ fileName !== ''? 'bg-texto2': 'bg-background'} border border-borda text-white rounded-md px-2`}
                        value="Salvar Nova Imagem"
                    />                
                </div>

            </div>

        </div>
    )
}

export default DadosProduto