"use client"

import { Image } from "@/types/types"
import { useEffect, useState } from "react"
import imagemproduto from '../../../public/images/img_3975-xfqzgt5sa1.jpeg'
import Placeholder from "./Placeholder"

type ImagemProdutoProps = {
    className?: string,
    imagens?: Image[],
}

const ImagemProduto = ({ className, imagens }:ImagemProdutoProps) => {
    const [ imagemSelecionada, setImagemSelecionada ] = useState("")
    
    const listaImagens = imagens?.map((i) => i.url)
    
    useEffect(() =>{
        listaImagens && setImagemSelecionada(listaImagens[0])
    },[])
    
    if(!listaImagens || !imagemSelecionada){
        return(
            <Placeholder />
        )   
    }
        
    return (
        <div className={`${className}`}>
            <div className="h-96 md:h-[620px] overflow-hidden border border-gray-200 rounded-lg relative">
                <img 
                    className="max-h-[420px] md:max-h-[640px] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" 
                    src={imagemSelecionada} alt={'imagem'} 
                />
            </div>
            
            <div className="flex gap-2 justify-center w-full">
                {
                    listaImagens.map((imagem, index) => {
                        return(
                            <button 
                                key={index} 
                                className="hover:bg-gray-200 cursor-pointer"
                                onClick={() => setImagemSelecionada(imagem) }
                            >
                                <img 
                                    className="md:h-20 h-[60px]"
                                    src={imagem} alt="miniatura" 
                                />
                            </button>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default ImagemProduto