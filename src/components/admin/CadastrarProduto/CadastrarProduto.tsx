'use client'

import { LoaderCircle } from 'lucide-react'
import { Category, Product } from "@/types/types"
import useCadastrarProduto from "./useCadastrarProduto"
import Campo from './Campo'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'



const CadastrarProduto = ({produtos,categorias}:{produtos:Product[],categorias:Category[]}) => {

    const { changeBarcode,changeBrand,changeDepth,changeDescription,changeDiscountPercentage,
        changeHeight,changeId,changeMinimumOrderQuantity,changePrice,changeQrCode,
        changeReturnPolicy,changeShippingInformation,changeSku,changeStock,changeThumbnail,
        changeTitle,changeWarrantyInformation,changeWeight,changeWidth,idCategoria,loading,
        mensagem,produto,salvar,setIdCategoria,idProduto,setIdProduto, modo } = useCadastrarProduto({produtos,categorias})

    const searchParams = useSearchParams()
    const filtroIdProduto = searchParams.get('id')
    
    useEffect(() => {
        if(filtroIdProduto){
            setIdProduto(filtroIdProduto)
        }
    },[filtroIdProduto])
    
    if(!produto){
        return <></>
    }

    return(
        <div className="w-96 border border-gray-200 rounded-lg p-4">
            <h1 className="text-center font-bold text-lg text-gray-500">{modo} Produto</h1>
            <div className="flex flex-col gap-y-2">
                <Campo 
                    classWidth='flex-1 bg-gray-100 text-blue-400'
                    label='ID:'
                    inputType='input'
                    type='number'
                    value={idProduto}
                    changeFunction={changeId}
                    readOnly={true}
                />

                <Campo 
                    classWidth='flex-1'
                    label='Título'
                    type="text" 
                    inputType='input'
                    value={produto.title}
                    changeFunction={changeTitle}                    
                />
                <Campo 
                    classWidth='flex-1'
                    label='SKU:'
                    inputType='input'
                    type="text" 
                    value={produto.sku}
                    changeFunction={changeSku}                    
                />
                <Campo 
                    label='Seção:'
                    inputType='input'
                    type="number" 
                    value={idCategoria.toString()}
                    changeFunction={setIdCategoria}
                    classWidth='w-10'
                >
                    <div className="flex-1 border border-gray-200 bg-gray-100 text-violet-500 rounded px-2">
                        {produto?.category?.description}
                    </div>
                </Campo>
                <Campo
                    inputType='textarea'
                    classWidth='flex-1'
                    label="Descrição:"
                    value={produto.description}
                    changeFunction={changeDescription}                    
                />
                <Campo                 
                    classWidth='flex-1'
                    label='Preço:'
                    inputType='input'
                    type="number" 
                    value={produto.price?.toString()}
                    changeFunction={changePrice}                    
                />
                <Campo 
                    classWidth='flex-1'
                    label='Desconto(%)'
                    inputType='input'
                    type="number" 
                    value={produto.discountPercentage?.toString() || ""}
                    changeFunction={changeDiscountPercentage}                    
                />
                <Campo 
                    classWidth='flex-1'
                    label='Img. Miniatura:'
                    inputType='textarea'
                    value={produto.thumbnail}
                    changeFunction={changeThumbnail}                    
                />

                <Campo
                    classWidth='flex-1'
                    label='Brand:' 
                    type="text"
                    inputType='input' 
                    value={produto.brand}
                    changeFunction={changeBrand}
                />
                <Campo 
                    classWidth='flex-1'
                    label='Qtd. Mínima:'
                    type="number" 
                    inputType='input'
                    value={produto.minimumOrderQuantity?.toString() || ""}
                    changeFunction={changeMinimumOrderQuantity}
                />
                <Campo
                    classWidth='flex-1'
                    label='Polít. de Devolução:'
                    inputType='textarea'
                    value={produto.returnPolicy}
                    changeFunction={changeReturnPolicy}
                />
                <Campo
                    classWidth='flex-1'
                    label='Info. de Envio:'
                    inputType='textarea'
                    value={produto.shippingInformation}
                    changeFunction={changeShippingInformation}
                />
                <Campo 
                    classWidth='flex-1'
                    label='Estoque:'
                    type="number"
                    inputType='input' 
                    value={produto.stock?.toString()}
                    changeFunction={changeStock}   
                />
                <Campo
                    classWidth='flex-1'
                    label='Info. de Garantia:'
                    inputType='textarea'
                    value={produto.warrantyInformation}
                    changeFunction={changeWarrantyInformation}
                />
                <Campo 
                    classWidth='flex-1'
                    label='Cod. de Barras:'
                    type="text" 
                    inputType='input'
                    value={produto.meta?.barcode}
                    changeFunction={changeBarcode}
                />
                <Campo
                    classWidth='flex-1'
                    label='QrCode:'
                    inputType='textarea'
                    value={produto.meta?.qrCode}
                    changeFunction={changeQrCode}
                />
                <Campo
                    classWidth='flex-1'
                    label='Peso:'                
                    inputType='input'
                    type="number" 
                    value={produto.weight?.toString()}
                    changeFunction={changeWeight}
                />
                <Campo
                    classWidth='flex-1'
                    label='Altura:' 
                    type="number"
                    inputType='input' 
                    value={produto.dimensions?.height?.toString()}
                    changeFunction={changeHeight}
                />
                <Campo
                    classWidth='flex-1'
                    label='Largura:' 
                    type="number" 
                    inputType='input'
                    value={produto.dimensions?.width?.toString()}
                    changeFunction={changeWidth}
                />
                <Campo 
                    classWidth='flex-1'
                    label='Profundidade:'
                    type="number" 
                    inputType='input'
                    value={produto.dimensions?.depth?.toString()}
                    changeFunction={changeDepth}
                />
                <div className="flex justify-center">
                    <button 
                        className="inline bg-violet-500 text-white w-30 px-2 rounded-xl relative"
                        onClick={() => salvar()}
                    >
                        Salvar
                        <LoaderCircle size={20} className={`${loading? 'block':'hidden'} animate-spin absolute top-0.5 right-1`}/>
                    </button>
                </div>
            </div>
            <div>
                {mensagem}
            </div>
        </div>        
    )
}

export default CadastrarProduto