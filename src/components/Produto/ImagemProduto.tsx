"use client"

import { Image } from "@/types/types"
import { useEffect, useState } from "react"
import Placeholder from "./Placeholder"
import Imagem from "next/image"

type ImagemProdutoProps = {
    className?: string,
    imagens?: Image[],
}

const ImagemProduto = ({ className, imagens }:ImagemProdutoProps) => {
    const [ imagemSelecionada, setImagemSelecionada ] = useState("")
    const [ carregando, setCarregando ] = useState(true)
    
    const listaImagens = imagens?.map((i) => i.url)
    
    useEffect(() =>{
        listaImagens && setImagemSelecionada(listaImagens[0])
        setCarregando(false)
    },[])
    
    if(carregando){
        return(
            <Placeholder className="animate-pulse"/>
        )   
    }

    if(!listaImagens || !imagemSelecionada){
        return(
            <Placeholder />
        )   
    }

        
    return (
        <div className={`${className}`}>
            <div 
                className="bg-white h-96 md:h-[620px] overflow-hidden 
                relative rounded-lg shadow-md"
            >
                <Imagem
                    className="object-cover" 
                    src={imagemSelecionada} alt={'imagem'} 
                    fill={true}                    
                />
            </div>
            
            <div className="flex gap-2 justify-center w-full my-4">
                {
                    listaImagens.map((imagem, index) => {
                        return(
                            <div
                                key={index} 
                                onClick={() => setImagemSelecionada(imagem) }
                                
                                className="md:h-20 h-[60px] relative cursor-pointer w-1/6"
                            >
                                <Imagem
                                    className="object-contain rounded-lg hover:scale-105 transition-all duration-300"
                                    src={imagem} alt="miniatura"
                                    fill={true}
                                />
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ImagemProduto