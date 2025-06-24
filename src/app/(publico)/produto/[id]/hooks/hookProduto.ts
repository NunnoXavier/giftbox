import { fetchEstoqueProdutos, fetchPrecoProdutos, fetchProduto } from "@/serverCache/fetchsProdutos"
import { ProductCart } from "@/types/types"

export const hookProduto = async (id:string) => {
    const produto = await fetchProduto(Number(id))
    const estoques = await fetchEstoqueProdutos()
    const precos = await fetchPrecoProdutos()

    const estoque = estoques.find((e) => e.id === Number(id))?.stock || 0
    const valores = precos.find((e) => e.id === Number(id))

    const imagens = produto.images

    const itemSacola:ProductCart = {
        id: 0,
        title: produto.title || "",
        idProduct: produto.id || 0,
        qtde: 1,
        price: produto.price,
        discountPercentage: produto.discountPercentage,
        thumbnail: produto.thumbnail
    }

    const preco = valores?.price? valores.price : 0
    const perc = valores?.discountPercentage? valores.discountPercentage : 0
    const desc = (preco * (perc / 100))
    const promo = preco - desc 

    return {
        produto,
        estoque,
        imagens,
        itemSacola,
        preco,
        promo,
        desc,
        perc
    }
}
