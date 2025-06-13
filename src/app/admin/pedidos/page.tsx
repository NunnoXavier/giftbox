import PedidosFiltrados from "@/components/admin/pedidos/FiltroPedidos/PedidosFiltrados"
import { Suspense } from 'react'

const PedidosAdmin = async () => {
    
    return (
        <div className="container min-h-dvh mx-auto p-4">            
            <h1 className="text-2xl font-semibold mb-4">Pedidos</h1>
            <Suspense fallback={<div>Carregando...</div>}>
                <PedidosFiltrados />
            </Suspense>
        </div>
    )
}

export default PedidosAdmin