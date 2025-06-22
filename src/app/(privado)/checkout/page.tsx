import { fetchUsuario } from "@/cachedFetchs/fetchUsuario"
import Endereco from "./components/Endereco"
import Pagamento from "@/app/(privado)/checkout/components/Pagamento"
import TotalPedido from "@/components/Checkout/TotalPedidos/TotalPedido"
import { fetchPrecoProdutos } from "@/cachedFetchs/fetchsProdutos"

const Checkout = async () => {
    const usuario = await fetchUsuario()
    const precos = await fetchPrecoProdutos()

    if(!usuario){
        return (
            <div className="flex not-md:flex-col justify-center gap-4">
                <h1 className="text-xl">Usuario não encontrado</h1>
                <a href="/login" className="text-texto-link">Faça login para continuar</a>
            </div>
        )
    }

    return (
        <div className="flex not-md:flex-col justify-center gap-4">
            <div className="flex flex-col md:w-120 gap-4">
                <Endereco usuario={usuario}/>
                <Pagamento usuario={usuario}/>
            </div>
            <div className="md:w-96">
                <TotalPedido usuario={usuario} precos={precos} />
            </div>
        </div>
    )
}

export default Checkout

