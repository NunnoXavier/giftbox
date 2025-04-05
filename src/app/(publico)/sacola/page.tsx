import ProdutoSacola,{TProdutoSacola} from "@/components/QtdSacola/ProdutoSacola"
import { Product, ProductCart } from "@/types/types"
import { cookies } from "next/headers"

const Sacola = async () => {
    const res1 = await fetch('http://localhost:3000/api/produtos')
    const { data:produtos, error }:{data:Product[], error: string} = await res1.json()
    if(!produtos){
        console.log(error)
        return
    }

    const cookieStore = await cookies()
    if(!cookieStore){
        return
    }
    const myCookie = cookieStore.get('SIGIFTBOX_AUTH_TOKEN')
    if(!myCookie){
        return
    }

    const res2 = await fetch('http://localhost:3000/api/usuarios/sacola', {
        method: 'GET',
        headers: { Cookie: `SIGIFTBOX_AUTH_TOKEN=${myCookie.value}` },
        credentials: "include",
    })    
    const { data:sacola, error:error2 }:{data: ProductCart[], error: string} = await res2.json()
    if(!sacola){
        console.log(error2)
        return
    }

    const produtosSacola = sacola.map((pro, i) => {
        const produto = produtos.find((p) => p.id === pro.idProduct)
        return {
            pos: i +1,
            qtde: pro.qtde,
            id: pro.idProduct,            
            title: produto?.title || 'NÃO ENCONTRADO',
            thumbnail: produto?.thumbnail || '',
            price: produto?.price || 0,
            discountPercentage: produto?.discountPercentage || 0,
        }
    }) as TProdutoSacola[]
    
    return (
        <div className="h-dvh flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-gray-600 mb-4">Sacola</h1>

            <div className="grid grid-cols-1 md:grid-cols-20 gap-8 max-w-300 h-14/20 p-2">
                <div className="col-span-1 md:col-span-12 border border-gray-200 overflow-scroll rounded-md">
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="grid grid-cols-24 gap-2 p-2 font-bold">
                            <span className="col-span-4 text-center"></span>
                            <span className="col-span-8 text-center">Produto</span>
                            <span className="col-span-3 text-center">Qtde</span>
                            <span className="col-span-4 text-center">Preço</span>
                            <span className="col-span-4 text-center">Desct(%)</span>
                        </div>                        
                        {
                            produtosSacola.map((produto) => (
                                <ProdutoSacola key={produto.pos} produto={produto} />
                            ))
                        }
                    </div>
                </div>
            
                <div className="col-span-1 md:col-span-8 border border-gray-200 rounded-md p-2">
                        pagto
                </div>
            </div>


        </div>
    )
}

export default Sacola