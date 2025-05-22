'use client'

import { Order, User } from "@/types/types"

import { useEffect, useState } from "react"
import { fetchPedidosAdmin } from "@/cachedFetchs/fetchPedidosAdmin"
import { fetchUsuariosAdmin } from "@/cachedFetchs/fetchUsuariosAdmin"
import CardPedido from "./CardPedido"
import SkeletonPedido from "./SkeletonPedido"

type StatusFilter = "pending" | "paid" | "sent" | "received" | "canceled" | "all"

const PedidosFiltrados = () => {    

    const [status, setStatus] = useState<StatusFilter>("paid")
    const [pedidos, setPedidos] = useState<Order[]>([])
    const [usuarios, setUsuarios] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    const handleSelect = (value: string) => {
        const status = value as StatusFilter
        setStatus(status)        
    }

    useEffect(() => {
        const res = fetchPedidosAdmin()        
        res.then((data) => {
            setPedidos(data)
        })
        .then(() => {
            return fetchUsuariosAdmin()
        })
        .then((data) => {
            setUsuarios(data)
            setLoading(false)
        })

    }, [])

    const handleEnviarPedido = (idPedido: number) => {
        const pedido = pedidos.find((pedido) => pedido.id === idPedido)
        if (pedido) {
            pedido.status = "sent"
            setPedidos([...pedidos])
        }
    }

    const handleCancelarPedido = (idPedido: number) => {
        const pedido = pedidos.find((pedido) => pedido.id === idPedido)
        if (pedido) {
            pedido.status = "canceled"
            setPedidos([...pedidos])
        }
    }

    const handleReceberPedido = (idPedido: number) => {
        const pedido = pedidos.find((pedido) => pedido.id === idPedido)
        if (pedido) {
            pedido.status = "received"
            setPedidos([...pedidos])
        }
    }

    const pedidosFiltrados = pedidos.filter((pedido) => {
        if (status === "all") {
            return true
        }
        return pedido.status === status
    })

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <label htmlFor="status" className="text-texto-label">Status:</label>
                    <select id="status" 
                        onChange={(e) => { handleSelect(e.currentTarget.value) }} 
                        className="border border-borda rounded-md px-2 py-1"
                        defaultValue="paid"
                    >
                        <option value="paid">Pago</option>
                        <option value="pending">Pendente</option>
                        <option value="sent">Enviado</option>
                        <option value="received">Recebido</option>
                        <option value="canceled">Cancelado</option>
                        <option value="all">Todos</option>
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {   
                loading ? <SkeletonPedido /> 
                    :(                        
                        pedidosFiltrados
                        .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime())
                        .map((pedido) => {
                            const usuario = usuarios.find((u) => u.id === pedido.idUser)
                            return <CardPedido key={pedido.id} 
                                pedido={pedido} 
                                usuario={usuario!} 
                                fnEnviarPedido={handleEnviarPedido}
                                fnCancelarPedido={handleCancelarPedido}
                                fnReceberPedido={handleReceberPedido}
                            />
                        })
                    ) 
                    }
            </div>
        </div>
    )
}

export default PedidosFiltrados