import { Category, Dimensions, Meta, Product } from '@/types/types'
import { revalidateTag } from 'next/cache'
import CamposProduto from './CamposProduto'
import { fetchProdutosAdmin } from '@/serverCache/fetchsProdutos'
import { fetchSecoes } from '@/serverCache/fetchsSecoes'

const CadastrarProduto = async () => {

    const produtos = await fetchProdutosAdmin()
    
    const categorias = await fetchSecoes()

    const salvar = async (data: FormData) =>{
        'use server'

        const objeto: { [key: string]: FormDataEntryValue } = {};
        data.forEach((value, key) => {
            objeto[key] = value
        })
        
        const categoria:Category = { id: Number(objeto.idcategory), description: "" }
        const meta:Meta = {         
            barcode: String(objeto.barcode),
            qrCode: String(objeto.qrcode),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const dimensions:Dimensions = {
            depth: Number(objeto.depth),
            height: Number(objeto.height),
            width: Number(objeto.width),            
        }

        const produto:Product = {
            id: Number(objeto.id),
            title: String(objeto.title),
            description: String(objeto.description),
            category: categoria,
            price: Number(objeto.price),
            discountPercentage: Number(objeto.discountpercentage),
            stock: Number(objeto.stock),
            thumbnail: String(objeto.thumbnail),
            sku: String(objeto.sku),
            brand: String(objeto.brand),
            meta: meta,
            availabilityStatus: String(objeto.availabilitystatus),
            dimensions: dimensions,
            weight: Number(objeto.weight),
            minimumOrderQuantity: Number(objeto.minimumorderquantity),
            rating: Number(objeto.rating),
            returnPolicy: String(objeto.returnpolicy),
            shippingInformation: String(objeto.shippinginformation),
            warrantyInformation: String(objeto.warrantyinformation),
            tags: String(objeto.tags),
        }

      
        const res = await fetch('http://localhost:3000/api/protegido/produtos/cadastrar',{
            method: produto.id === 0? "PUT": "POST",
            body: JSON.stringify(produto)
        })
        
        const { data:result, error } = await res.json()

        if(!result){
            console.log(error)
        }

        revalidateTag('produtos')
        revalidateTag('preco-produtos')
        revalidateTag('estoque-produtos')
    }

    if(!produtos){
        return
    }

    return(
        <form 
        className="bg-white w-96 border border-borda rounded-lg p-4"
        action={salvar}
        >
            <h1 className="text-center font-bold text-lg text-texto-label">Cadastrar Produto</h1>
            <CamposProduto produtos={ produtos } categorias={ categorias }/>

            <div className='flex justify-center mt-4'>
                <input 
                    className="inline bg-texto2 text-white w-30 px-2 rounded-xl relative"
                    type="submit"
                    value="salvar"
                    />

            </div>
        </form>        
    )
}

export default CadastrarProduto