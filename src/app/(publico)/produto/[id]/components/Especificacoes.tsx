import { toDateBr } from "@/services/utils"
import { Product } from "@/types/types"

const Especificacoes = ({produto}:{produto:Product}) => {
    return (
        <div 
            className="flex flex-col gap-8 col-start-1 md:col-start-2 col-span-1 
            md:col-span-12 p-4 mt-20 wrap-break-word"
        >
            <h1 className="text-2xl text-center">DESCRIÇÃO</h1>
            <p className="text-justify whitespace-break-spaces">{produto.description}</p>
            
            <div className="flex gap-2">
                <b className="w-40">Tags:</b> 
                <span className="flex-1">{produto.tags || ""} </span>
            </div>
            
            <h1 className="text-2xl text-center">ESPECIFICAÇÕES</h1>
            <ul className="list-image-none list-inside">
                <li className="flex gap-2">
                    <b className="w-40">Marca:</b> 
                    <span className="flex-1">{produto.brand}</span>
                </li>
                <li className="flex gap-2">
                    <b className="w-40">Categoria:</b>
                    <span className="flex-1">{produto.category?.description}</span>
                </li>
                <li className="flex gap-2">
                    <b className="w-40">Data de cadastro:</b>
                    <span className="flex-1">{toDateBr(produto.meta?.createdAt)}</span>
                </li>
                <li className="flex gap-2">
                    <b className="w-40">Última atualização:</b>
                    <span className="flex-1">{toDateBr(produto.meta?.updatedAt)}</span>
                </li>
            </ul>
            <h1 className="text-2xl text-center">DIMENSÕES</h1>
            <ul className="list-image-none list-inside">
                <li className="flex gap-2">
                    <b className="w-40">Peso:</b>
                    <span className="flex-1">{produto.weight} kg</span>
                </li>
                <li className="flex gap-2">
                    <b className="w-40">Altura:</b>
                    <span className="flex-1">{produto.dimensions?.height} cm</span>
                </li>
                <li className="flex gap-2">
                    <b className="w-40">Largura:</b>
                    <span className="flex-1">{produto.dimensions?.width} cm</span>
                </li>
                <li className="flex gap-2">
                    <b className="w-40">Profundidade:</b>
                    <span className="flex-1">{produto.dimensions?.depth} cm</span>
                </li>
            </ul>   

            <h1 className="text-2xl text-center">POLÍTICAS DE DEVOLUÇÃO</h1>
            <p className="text-justify">{produto.returnPolicy || ""}</p>

            <h1 className="text-2xl text-center">INFORMAÇÕES DE ENVIO</h1>
            <p className="text-justify">{produto.shippingInformation || ""}</p>
        </div>        
    )
}

export default Especificacoes