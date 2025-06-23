import { Product } from "@/types/types"
import BtnAddSacola from "@/components/BtnAddSacola/BtnAddSacola"
import FlagPromo from "../FlagPromo"
import Image from "next/image"
import { toCurrencyBr } from "@/services/utils"
import hooks, { TSize, classesBase } from "./hooks"

export type ProdutoSecaoProps = {
    className?: string,
    produto: Product,
    size?: TSize
}

const ProdutoSecao = async ({ className, produto, size='lg' }: ProdutoSecaoProps) => {
    const data = await hooks(produto)
    const classSize = data.classSize(size)
    const titleSize = data.titleSize(size)

    return (
        <div className={`${className} ${ classSize } ${classesBase}`}>
            <FlagPromo perc={data.perc} visible={data.perc > 0} />
            <a href={`/produto/${produto.id}`} className="relative w-full h-1/2">
                <Image
                    className="object-cover rounded-md"
                    src={  produto.thumbnail || '/images/placeholder.jpeg'} 
                    alt={`img: ${produto?.title}`}
                    fill
                />
            </a>
                
            <p className={`font-bold ${titleSize}`}>{produto?.title}</p>
            <div className={`${data.emEstoque? 'visible' : 'invisible'}`}>
                <p className={`${data.emPromocao? '': 'text-transparent'} text-sm `} 
                >
                    <s>{toCurrencyBr(data.preco)}</s>
                </p>
                <p className={`${data.emPromocao? 'text-texto-alerta': ''} ${titleSize}`} 
                >
                    {toCurrencyBr(data.promo)}
                </p>
            </div>
            <BtnAddSacola produto={produto} disponivel={data.emEstoque} />
        </div>
    )
}

export default ProdutoSecao