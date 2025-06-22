import { OrderProduct } from "@/types/types"
import Image from 'next/image'

const ItemPedido = ({ item }:{ item:OrderProduct }) => {
    return (
        <div className="flex gap-4 my-2">
            {
                <Image  
                    src={ item.thumbnail || "/images/placeholder.jpeg" }
                    height={100}
                    width={100}
                    alt="img"
                />
            }
            <div className="flex flex-col flex-1 py-1">
                <span className="font-semibold text-texto text-wrap">
                    {`${item.title.slice(0,35)}${item.title.length > 100? '...':''}`}
                </span>
                <span className="text-texto text-sm">
                    {`Qtd: ${item.qtde} unidade${(item.qtde > 1)? 's':''}`}
                </span>
            </div>
        </div>
    )
}

export default ItemPedido