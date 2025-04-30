import { OrderProduct } from "@/types/types"
import Image from 'next/image'

const ItemPedido = ({ item }:{ item:OrderProduct }) => {
    return (
        <div className="flex gap-2">
            {
                item.thumbnail? (
                    <Image  
                        src={ item.thumbnail}
                        height={100}
                        width={100}
                        alt="img"
                    />
                ): (
                    <div className="bg-white relative md:h-25 h-25 w-25 border border-gray-200">
                        <div className="absolute z-2 w-5 h-1 bg-gray-200 top-3/12 md:top-4/12  left-4/12 -translate-1/2 rounded-xs"></div>
                        <div className="absolute z-5 w-6 h-6 bg-white top-6/12 left-1/2 -translate-1/2 rounded-full"></div>
                        <div className="absolute z-6 w-5 h-5 bg-gray-200 top-6/12 left-1/2 -translate-1/2 rounded-full"></div>
                        <div className="absolute w-15 h-8 bg-gray-200 top-6/12 left-1/2 -translate-1/2 rounded-xs"></div>
                    </div>                    
                )
            }
            <div className="flex flex-col flex-1">
                <span className="font-semibold text-gray-700 text-wrap">
                    {`${item.title.slice(0,100)}${item.title.length > 100? '...':''}`}
                </span>
                <span className="text-gray-700 text-sm">
                    {`Qtd: ${item.qtde} unidade${(item.qtde > 1)? 's':''}`}
                </span>
            </div>
        </div>
    )
}

export default ItemPedido