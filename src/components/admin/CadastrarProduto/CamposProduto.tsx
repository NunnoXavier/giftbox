'use client'

import { Category, Product } from "@/types/types"
import { useEffect, useState } from "react"
import Campo from "./Campo"
import { useSearchParams } from "next/navigation"
import { dinheiro } from "@/services/useMask"

const initProduto: Product = {
    id: 0,
    description: "",
    category: { id: 0, description: ""},
    price: 0,
    discountPercentage: 0,
    stock: 0,
    thumbnail: "",
    sku: "",
    brand: "",
    meta: { 
        barcode: "", 
        qrCode: "", 
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    availabilityStatus: "",
    dimensions: {
        depth: 0,
        height: 0,
        width: 0,
    },
    weight: 0,
    minimumOrderQuantity: 0,
    rating: 0,
    returnPolicy: "",
    shippingInformation: "",
    warrantyInformation: "",        
}


const CamposProduto = ({ className, produtos, categorias }:{ className?:string, produtos:Product[], categorias: Category[] }) => {
    const [ id, setId ] = useState("")
    const [ idCategoria, setIdCategoria ] = useState("")
    const [ preco, setPreco ] = useState("")
    const [ desconto, setDesconto ] = useState("")
    const [ produto, setProduto ] = useState(initProduto)

    const searchParams = useSearchParams()
    const paramId = searchParams.get('id')    
    
    useEffect(() => {
        if(!paramId || Number(paramId) === 0){
            setId("")
            return
        }

        setId(paramId)
        
    },[searchParams])

    useEffect(() => {
        const pro = produtos.find((p) => p.id === Number(id))
        
        if(!pro){
            setProduto(initProduto)
            setIdCategoria("")
            setPreco("")
            setDesconto("")
            return
        }
        
        setProduto(pro)
        setIdCategoria(pro.category?.id.toString() || "")
        setPreco(pro.price?.toString() || "")
        setDesconto(pro.discountPercentage?.toString() || "")

    },[id])
    
    useEffect(() => {
        const cat = categorias.find((c) => c.id === Number(idCategoria))
        
        if(!cat){
            setProduto({ ...produto, category: { id:0, description: "" } })
            return
        }
        
        setProduto({ ...produto, category: cat })
    },[idCategoria])
    
    useEffect(() => {
        setProduto({ ...produto, price: Number(preco) })
    },[preco])
    
    useEffect(() => {
        setProduto({ ...produto, discountPercentage: Number(desconto) })
    },[desconto])
    
    return (
        <div className="flex flex-col gap-y-2">
            <div className={`${className} bg-white flex gap-2`}>
                <label className="w-30 text-right text-texto-label">ID:</label>
                <input 
                    name="id"
                    type="number"
                    className="border border-borda rounded px-2 w-10"
                    step={1}
                    value={id}
                    readOnly
                    onChange={(e) => setId(e.currentTarget.value)}
                    />
            </div>

            <Campo 
                name="title"
                classWidth='flex-1'
                label='Título'
                type="text" 
                inputType='input'
                value={produto.title || ""}
                onChange={(e) => setProduto({ ...produto, title: e.currentTarget.value })}
                />
            <Campo 
                name="sku"
                classWidth='flex-1'
                label='SKU:'
                inputType='input'
                type="text" 
                value={produto.sku || ""}
                onChange={(e) => setProduto({ ...produto, sku: e.currentTarget.value })}
                />
            <div className="flex gap-2">
                <Campo 
                    name="idcategory"
                    label='Seção:'
                    inputType='input'
                    type="number" 
                    classWidth='w-10'
                    value={idCategoria}
                    onChange={(e) => setIdCategoria( e.currentTarget.value)}
                />
                <div className="flex-1 text-center text-texto-link bg-background">
                    {produto.category?.description}
                </div>
            </div>

            <Campo
                name="description"
                inputType='textarea'
                classWidth='flex-1'
                label="Descrição:"
                value={produto.description || ""}
                onChange={(e) => setProduto({ ...produto, description: e.currentTarget.value })}
                />
            <Campo                 
                name="price"
                classWidth='flex-1'
                label='Preço:'
                inputType='input'
                type="number"
                value={preco}
                onChange={(e) => setPreco(dinheiro(e.currentTarget.value))}
                step="0.01"                
                
                />
            <Campo 
                name="discountpercentage"
                classWidth='flex-1'
                label='Desconto(%)'
                inputType='input'
                type="number" 
                value={desconto}
                onChange={(e) => setDesconto(dinheiro(e.currentTarget.value))}
                />
            <Campo 
                name="thumbnail"
                classWidth='flex-1'
                label='Img. Miniatura:'
                inputType='textarea'
                value={produto.thumbnail || ""} 
                onChange={(e) => setProduto({ ...produto, thumbnail: e.currentTarget.value })}
                />

            <Campo
                name="brand"
                classWidth='flex-1'
                label='Brand:' 
                type="text"
                inputType='input' 
                value={produto.brand || ""}
                onChange={(e) => setProduto({ ...produto, brand: e.currentTarget.value })}
                />
            <Campo 
                name="minimumorderquantity"
                classWidth='flex-1'
                label='Qtd. Mínima:'
                type="number" 
                inputType='input'
                value={produto.minimumOrderQuantity?.toString() || ""} 
                onChange={(e) => setProduto({ ...produto, minimumOrderQuantity: Number(e.currentTarget.value) })}
                />
            <Campo
                name="returnpolicy"
                classWidth='flex-1'
                label='Polít. de Devolução:'
                inputType='textarea'
                value={produto.returnPolicy || ""}
                onChange={(e) => setProduto({ ...produto, returnPolicy: e.currentTarget.value })}
                />
            <Campo
                name="shippinginformation"
                classWidth='flex-1'
                label='Info. de Envio:'
                inputType='textarea'
                value={produto.shippingInformation || ""}
                onChange={(e) => setProduto({ ...produto, shippingInformation: e.currentTarget.value })}
                />
            <Campo 
                name="stock"
                classWidth='flex-1'
                label='Estoque:'
                type="number"
                inputType='input' 
                value={produto.stock?.toString() || ""}
                onChange={(e) => setProduto({ ...produto, stock: Number(e.currentTarget.value) })}
                />
            <Campo
                name="warrantyinformation"
                classWidth='flex-1'
                label='Info. de Garantia:'
                inputType='textarea'
                value={produto.warrantyInformation || ""}
                onChange={(e) => setProduto({ ...produto, warrantyInformation: e.currentTarget.value })}
                />
            <Campo 
                name="barcode"
                classWidth='flex-1'
                label='Cod. de Barras:'
                type="text" 
                inputType='input'
                value={produto.meta?.barcode || ""}
                onChange={(e) => setProduto({ ...produto, meta:{ ...produto.meta, barcode: e.currentTarget.value } })}
                />
            <Campo
                name="qrcode"
                classWidth='flex-1'
                label='QrCode:'
                inputType='textarea'
                value={produto.meta?.qrCode || ""}
                onChange={(e) => setProduto({ ...produto, meta:{ ...produto.meta, qrCode: e.currentTarget.value } })}
                />
            <Campo
                name="weight"
                classWidth='flex-1'
                label='Peso:'                
                inputType='input'
                type="number" 
                value={produto.weight?.toString() || ""}
                onChange={(e) => setProduto({ ...produto, weight: Number(e.currentTarget.value) })}
                />
            <Campo
                name="height"
                classWidth='flex-1'
                label='Altura:' 
                type="number"
                inputType='input' 
                value={produto.dimensions?.height?.toString() || ""}
                onChange={(e) => setProduto({ ...produto, dimensions:{ ...produto.dimensions, height: Number(e.currentTarget.value) } })}
                />
            <Campo
                name="width"
                classWidth='flex-1'
                label='Largura:' 
                type="number" 
                inputType='input'
                value={produto.dimensions?.width?.toString() || ""}
                onChange={(e) => setProduto({ ...produto, dimensions:{ ...produto.dimensions, width: Number(e.currentTarget.value) } })}
                />
            <Campo 
                name="depth"
                classWidth='flex-1'
                label='Profundidade:'
                type="number" 
                inputType='input'
                value={produto.dimensions?.depth?.toString() || ""}
                onChange={(e) => setProduto({ ...produto, dimensions:{ ...produto.dimensions, depth: Number(e.currentTarget.value) } })}
                />            

        </div>
    )
}

export default CamposProduto