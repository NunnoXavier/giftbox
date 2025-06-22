import { fetchUser } from "@/uncachedFetchs/fetchUser"
import AvaliarProdutos from "./components/AvaliarProdutos"
import PedidosEmAberto from "./components/PedidosEmAberto"
import ProdutosRecomendados from "./components/ProdutosRecomentados"

const Dashboard = async () => {

    const usuario = await fetchUser()
    if (!usuario) {
        return <p>Erro ao buscar usuário</p>
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
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