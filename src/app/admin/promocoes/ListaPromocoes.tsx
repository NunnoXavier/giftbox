import { toDateBr } from "@/services/utils"
import { Promocao } from "@/types/types"
import Link from "next/link"
import Image from "next/image"

const ListaPromocoes = ({ promocoes }: { promocoes: Promocao[] }) => {
    
    return (
        <ul className="flex flex-col gap-8">
            {promocoes.map((promocao) => (
                <li key={promocao.id}
                    className="flex flex-col"
                >
                    <h2 className="text-texto text-lg mb-2">{promocao.title}</h2>
                    <div className="flex justify-between">
                        <span className="text-xs">{`criado em: ${toDateBr(promocao.createdAt)}`}</span>
                        <span className="text-xs">{`termina em: ${toDateBr(promocao.finalDate)}`}</span>                        
                    </div>
                    <div className="relative w-full h-26 md:h-50">
                        <Image
                            className="object-contain" 
                            src={promocao.banner}
                            alt={promocao.title}
                            fill
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-2 text-xs">
                        <Link 
                            href={`/admin/promocoes/editar/${promocao.id?.toString()}`}
                            className="bg-blue-600 hover:bg-blue-500 
                          text-white px-4 py-1 rounded-md"
                        >
                            Editar
                        </Link>

                    </div>
                </li>
            ))}    
        </ul>
    )
}

export default ListaPromocoes