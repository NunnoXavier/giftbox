"use client"

import { Image } from "@/types/types"
import { useEffect, useState } from "react"
import imagemproduto from '../../../public/images/img_3975-xfqzgt5sa1.jpeg'
import Placeholder from "./Placeholder"
import Imagem from "next/image"

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
            <div 
                className=" bg-white h-96 md:h-[620px] overflow-hidden border 
                border-borda rounded-lg relative shadow-md"
            >
                <Imagem
                    className="max-h-[420px] md:max-h-[640px] absolute top-1/2 -translate-y-1/2 
                    left-1/2 -translate-x-1/2" 
                    src={imagemSelecionada} alt={'imagem'} 
                    width={1000} height={1000}
                />
            </div>
            
            <div className="flex gap-2 justify-center w-full my-4">
                {
                    listaImagens.map((imagem, index) => {
                        return(
                            <button 
                                key={index} 
                                className="bg-white hover:bg-background cursor-pointer border border-borda rounded-lg shadow-md"
                                onClick={() => setImagemSelecionada(imagem) }
                            >
                                <Imagem
                                    className="md:h-20 h-[60px] rounded-lg"
                                    src={imagem} alt="miniatura"
                                    width={100} height={100}
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