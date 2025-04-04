import { Product } from "@/types/types"

interface ProductCart extends Product{
    pos: number,
    qtd: number,
}

const Sacola = async() => {
    const res = await fetch('http://localhost:3000/api/usuarios/sacola', {
        method: 'GET',
        // headers: {"Content-type": "Application-json"},
        // credentials: "include",
    })

    const { data, error } = await res.json()
    if(!data){
        console.log(error)
        return
    }
    console.log(data)    

    const produtos:ProductCart[] = Array.from({length: 10}, (_, i) => {
        return {
            pos: i +1,
            qtd: 1,
            id: i,            
            title: `Titulo do Produto ${i} se for muito grande`,
            thumbnail: '/images/img_3975-xfqzgt5sa1.jpeg',
            price: 9999.99,
            discountPercentage: 99.99,            
        }
    })
    
    return (
        <div className="h-dvh flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-gray-600 mb-4">Sacola</h1>

            <div className="grid grid-cols-1 md:grid-cols-20 gap-8 max-w-300 h-14/20 p-2">
                <div className="col-span-1 md:col-span-12 border border-gray-200 overflow-scroll rounded-md">
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="grid grid-cols-24 gap-2 p-2 font-bold">
                            <span className="col-span-1">#.</span>
                            <span className="col-span-4"></span>
                            <span className="col-span-9">Produto</span>
                            <span className="col-span-2">Qtde</span>
                            <span className="col-span-4 text-right">Preço</span>
                            <span className="col-span-4 text-right">Desct(%)</span>
                        </div>                        
                        {
                            produtos.map((produto) => (
                                <div key={produto.pos} className="grid grid-cols-24 gap-2 p-2">
                                    <span className="col-span-1">{produto.pos.toString()}.</span>
                                    <img className="col-span-4" src={produto.thumbnail} alt="" />
                                    <span className="col-span-9">{produto.title}</span>
                                    <span className="col-span-2">{produto.qtd.toString()}</span>
                                    <span className="col-span-4 text-right">{produto.price?.toFixed(2)}</span>
                                    <span className="col-span-4 text-right">{produto.discountPercentage?.toFixed(2)}</span>

                                </div>
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