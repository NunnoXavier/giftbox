import { Category, Product, ProductDTO } from "@/types/types"
import { useEffect, useState } from "react"

const initProduct: ProductDTO = {
    id: 0,
    title: '',
    category: {id:0, description: ''},
    idcategory: 0,
    description: '',
    brand: '',
    price: 0,
    discountPercentage: 0,
    depth: 0,
    height: 0,
    width: 0,
    minimumOrderQuantity: 0,
    returnPolicy: '',
    shippingInformation: '',
    sku: '',
    stock: 0,
    thumbnail: '',
    warrantyInformation: '',
    weight: 0,
    barcode: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    qrCode: '',
}

const useCadastrarProduto = ({produtos, categorias}:{produtos:Product[],categorias:Category[]}) => {
    const [ produto, setProduto ] = useState<ProductDTO>(initProduct)   
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

        const pro = produtos.find((p) => p.id === Number(idProduto)) as ProductDTO
        if(!pro){
            setProduto(initProduct)
            setModo('Cadastrar')
            return
        }

        setProduto(pro)
        setModo('Alterar')

    },[idProduto]) 

    const salvar = async() => {
        try {
            setLoading(true)
            setMensagem("")
            const res = await fetch('http://localhost:3000/api/protegido/produtos/cadastrar',{
                method: 'POST',
                headers:{ "Content-type":"Application-json" },
                body: JSON.stringify(produto)                
            })

            const data = await res.json()

            if(res.status !==200){
                setMensagem("Ocorreu um erro ao cadastrar o produto. Chame o Nuno")                
                console.log(data)
            }else{
                setMensagem(`Produto cadastrado com sucesso`)
                console.log(data)
            }

        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    const changeId = (value:string) => {
        try {
            // const payload = Number(value)
            // setProduto({...produto, id: payload})
            setIdProduto(value)
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeTitle = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, title: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeCategory = () => {
        try {
            const payload = categorias.find((c) => c.id === Number(idCategoria))
            setProduto({...produto, 
                category: payload || 
                {id:9999, description: 'não definido'},
                idcategory: Number(idCategoria)
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
            setProduto({...produto, barcode: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeQrCode = (value:string) => {
        try {
            const payload = value
            setProduto({...produto, qrCode: payload})
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
            setProduto({...produto, height: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    const changeWidth = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, width: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }
    
    const changeDepth = (value:string) => {
        try {
            const payload = Number(value)
            setProduto({...produto, depth: payload})
        } catch (error:any) {
            console.log(error.message)
        }        
    }

    return {
        changeDepth, changeWidth, changeHeight, changeWeight, changeQrCode, changeBarcode,
        changeWarrantyInformation, changeThumbnail, changeStock, changeSku, changeShippingInformation,
        changeReturnPolicy, changeMinimumOrderQuantity, changePrice, changeDiscountPercentage,
        changeBrand, changeDescription, changeTitle, changeId, salvar, produto, idCategoria, 
        setIdCategoria, loading, mensagem, idProduto, modo
    }
}

export default useCadastrarProduto