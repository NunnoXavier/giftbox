import { fetchPedidosAdmin } from "@/cachedFetchs/fetchPedidosAdmin"
import { fetchUsuariosAdmin } from "@/cachedFetchs/fetchUsuariosAdmin"
import PedidosFiltrados from "@/components/admin/pedidos/FiltroPedidos/PedidosFiltrados"

const PedidosAdmin = async () => {
    
    await fetchPedidosAdmin()
    await fetchUsuariosAdmin()

    return (
        <div className="container min-h-dvh mx-auto p-4">            
            <h1 className="text-2xl font-semibold mb-4">Pedidos</h1>
            <PedidosFiltrados />
        </div>
    )
}

export default PedidosAdmin