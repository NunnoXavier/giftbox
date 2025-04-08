import { getImages, getProdutos, getReviews, getTags } from "@/db/produtos";
import { getCategorias } from "@/db/secoes";
import { Category, ImageDTO, Product, ProductDTO, Review, ReviewDTO, Tag, TagDTO, Image } from "@/types/types";
import { Description } from "@mui/icons-material";
import { NextRequest, NextResponse } from "next/server";
import { describe } from "node:test";



export const GET = async (request: NextRequest) => {
    try {
        const { data:dataProdutos, error:errorProdutos } = await getProdutos()
        if(!dataProdutos){
            return NextResponse.json({data:null, error:errorProdutos})            
        }
        
        const { data:dataCategorias, error:errorCategorias } = await getCategorias()
        if(!dataCategorias){
            return NextResponse.json({data:null, error:errorCategorias})            
        }
        
        const { data:dataReviews, error:errorReviews } = await getReviews()
        if(!dataReviews){
            return NextResponse.json({data:null, error:errorReviews})            
        }

        const { data:dataTags, error:errorTags } = await getTags()
        if(!dataTags){
            return NextResponse.json({data:null, error:errorTags})            
        }
        
        const { data:dataImages, error:errorImages } = await getImages()
        if(!dataImages){
            return NextResponse.json({data:null, error:errorImages})            
        }

        const produtos:Product[] = dataProdutos.map((p) => {
            const categoria = dataCategorias.find((c) => c.id === p.idcategory)
            const tags = dataTags.filter((t) => t.idproduct === p.id)
            const reviews = dataReviews.filter((review) => review.idproduct === p.id)
            const rating = reviews.length > 0? reviews.reduce((acc, review) => acc + review.rating ,0) / reviews.length :  0
            const images = dataImages.filter((image) => image.idproduct === p.id)
            return {
                id: p.id,
                title: p.title,
                description: p.description,                
                category: categoria || {id: 9999, description: "NAO_DEFINIDO"},
                rating: rating,
                tags: tags,
                reviews: reviews,
                dimensions: { 
                    height: p.height  || 0, 
                    width: p.width || 0, 
                    depth: p.depth  || 0
                },
                meta: {
                    createdAt: p.createdat  || new Date("1900-01-01"), 
                    updatedAt: p.updatedat  || new Date("1900-01-01"),
                    barcode: p.barcode,
                    qrCode: p.qrcode
                },                
                images: images,
                availabilityStatus: p.availabilitystatus,
                brand: p.brand,
                discountPercentage: p.discountpercentage,
                minimumOrderQuantity: p.minimumorderquantity,
                price: p.price,
                returnPolicy: p.returnpolicy,
                shippingInformation: p.shippinginformation,
                sku: p.sku,
                stock: p.stock,
                thumbnail: p.thumbnail,
                warrantyInformation: p.warrantyinformation,
                weight: p.weight,
            } 
        })

        return NextResponse.json({ data:produtos, error: null })
    } catch (error:any) {
        console.error(error.message)
        return NextResponse.json({ data:null, error: error.message })
    }
}

