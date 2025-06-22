import { TProdutosAvaliar } from "@/cachedFetchs/fetchProdutosAvaliar"
import BtnAvaliar from '@/components/BtnAvaliar/BtnAvaliar'
import Image from "next/image"
import Link from "next/link"

const ItemAvaliar = ({ item }: { item: TProdutosAvaliar }) => {
    if (!item) {
        return
    }

    return (
        <div className='flex flex-col gap-2' key={`o${item.order.id}-p${item.orderProduct.id}`}>
            <div className="flex items-start gap-4 pb-4">
                <Link href={`/produto/${item.orderProduct.idProduct}`}>
                    <Image
                    src={ item.orderProduct.thumbnail || "/images/placeholder.jpeg"}
                    alt="Produto"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded"
                    />
                
                </Link>
                <div className="flex-1">
                    <h3 className="font-medium text-texto">{ item.orderProduct.title }</h3>
                    <p className="text-sm text-texto-label mb-2">ID Produto: { item.orderProduct.idProduct.toString().padStart(6,'0') }</p>
                    <p className="text-sm text-texto-label mb-2">Pedido: F025-C22EG-{item.order.id?.toString().padStart(9,'0')}</p>
                </div>
            </div>
            <div>
                <BtnAvaliar item={item} />
            </div>
            <hr className='border-borda' />
        </div>                            
    )
}

export default ItemAvaliar