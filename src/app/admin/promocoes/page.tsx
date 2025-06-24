import { fetchPromocoes } from "@/serverCache/fetchPromocoes"
import ListaPromocoes from "./ListaPromocoes"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

const Promocoes = async () => {

    const promocoes = await fetchPromocoes()    

    if(!promocoes) {
        return <div>Erro ao carregar promocoes</div>
    }
  
    return (
        <div className="w-full min-h-dvh flex flex-col items-center justify-center my-8">
            <h1 className="font-bold text-2xl text-texto">Promoções</h1>
            <div className="w-md md:w-3xl h-150 md:h-170 overflow-scroll m-4 bg-white rounded-lg shadow-lg p-5">
                <ListaPromocoes promocoes={promocoes} />
            </div>
            <div>
                <Link href="/admin/promocoes/cadastrar"><PlusCircle/></Link>
            </div>
        </div>
    )
}

export default Promocoes