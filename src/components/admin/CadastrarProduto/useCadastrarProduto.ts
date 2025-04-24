import { Category, Product } from "@/types/types"
import { useEffect, useState } from "react"

const initProduct: Product = {
    id: 0,
    title: '',
    category: {
        id: 0,
        description: "",
    },
    description: '',
    brand: '',
    price: 0,
    discountPercentage: 0,
    dimensions: {
        depth: 0,
        height: 0,
        width: 0,
    },
    minimumOrderQuantity: 0,
    returnPolicy: '',
    shippingInformation: '',
    sku: '',
    stock: 0,
    thumbnail: '',
    warrantyInformation: '',
    weight: 0,
    meta: {
        barcode: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        qrCode: '',
    }
}

const useCadastrarProduto = ({produtos, categorias, fetchSalvar}:{produtos:Product[],categorias:Category[],fetchSalvar:({produto}:{produto:Product})=>Promise<Response>}) => {
    const [ produto, setProduto ] = useState<Product>(initProduct)   
    const [ idCategoria, setIdCategoria ] = useState('0')
    const [ idProduto, setIdProduto ] = useState('0')
    const [ loading, setLoading ] = useState(false)
    const [ mensagem, setMensagem ] = useState("")
    const [ modo, setModo ] = useState<'Cadastrar'|'Alterar'>('Cadastrar')

    
    useEffect(() => {
        changeCategory()
    },[idCategoria])

    useEffect(() => {
        if(!produtos){
            return
        }

        const pro = produtos.find((p) => p.id === Number(idProduto))        
        
        if(!pro){
            setProduto(initProduct)
            setModo('Cadastrar')
            return
        }

        setProduto(pro)
        setIdCategoria(pro.category?.id.toString() || "")
        setModo('Alterar')

    },[idProduto]) 

    const salvar = async() => {
        try {
            setLoading(true)
            setMensagem("")
            
            const res = await fetchSalvar({produto:produto})
            
            const {data, error} = await res.json()
            
            if(!data){
                setMensagem("Ocorreu um erro ao cadastrar o produto. Chame o Nuno")                
                throw new Error(error)
            }else{
                setMensagem(`Produto cadastrado com sucesso`)
            }           

        } catch (error:any) {
            console.log(error.message)
            
        }finally{
            setLoading(false)
        }
    }

    const changeId = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, id: payload})
            // setIdProduto(value)
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeTitle = (value:string) => {
        try {
            const payload = value.slice(0,49)
            setProduto({...produto, title: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeCategory = () => {
        try {
            const payload:Category | undefined = categorias.find((c) => c.id === Number(idCategoria))
            setProduto({...produto, 
                category: {
                    id: payload?.id || 9999,
                    description: payload?.description || ""
                }
                
            }) 
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeDescription = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, description: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeBrand = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, brand: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeDiscountPercentage = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, discountPercentage: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changePrice = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, price: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeMinimumOrderQuantity = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, minimumOrderQuantity: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeReturnPolicy = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, returnPolicy: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeShippingInformation = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, shippingInformation: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeSku = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, sku: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeStock = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, stock: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeThumbnail = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, thumbnail: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeWarrantyInformation = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, warrantyInformation: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeBarcode = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, meta: { ...produto.meta, barcode:payload }})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeQrCode = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, meta: { ...produto.meta, qrCode: payload}})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeWeight = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, weight: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeHeight = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, dimensions: { ...produto.dimensions, height: payload }})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeWidth = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, dimensions: { ...produto.dimensions, width: payload }})
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeDepth = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, dimensions: { ...produto.dimensions, depth: payload }})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    return {
        changeDepth, changeWidth, changeHeight, changeWeight, changeQrCode, changeBarcode,
        changeWarrantyInformation, changeThumbnail, changeStock, changeSku, changeShippingInformation,
        changeReturnPolicy, changeMinimumOrderQuantity, changePrice, changeDiscountPercentage,
        changeBrand, changeDescription, changeTitle, changeId, salvar, produto, setIdProduto, idCategoria, 
        setIdCategoria, loading, mensagem, idProduto, modo
    }
}

export default useCadastrarProduto