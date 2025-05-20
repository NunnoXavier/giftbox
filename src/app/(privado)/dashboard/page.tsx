import { fetchUser } from "@/uncachedFetchs/fetchUser"
import AvaliarProdutos from "./AvaliarProdutos"
import { User } from "@/types/types"
import Image from "next/image"
import PedidosEmAberto from "./PedidosEmAberto"
import ProdutosRecomendados from "./ProdutosRecomentados"

const Dashboard = async () => {

    const usuario = await fetchUser()
    if (!usuario) {
        return <p>Erro ao buscar usuário</p>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
            {/* Título Principal */}
            <div>
                <h1 className="text-3xl font-bold text-texto2">
                    {`${usuario.firstName} ${usuario.lastName}`}
                </h1>
                <p className="text-texto-label">Acompanhe seus pedidos, avaliações e recomendações.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <AvaliarProdutos />
                <PedidosEmAberto />
            </div>
            <ProdutosRecomendados />


        </div>

    )
}

export default Dashboard