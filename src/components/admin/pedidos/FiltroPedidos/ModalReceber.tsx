'use client'
import { actionReceberPedido } from "@/actions/admin/pedidos/actionReceberPedido"
import Modal from "@/components/Modal/Modal"
import { dateToISO } from "@/services/utils"
import { Order } from "@/types/types"
import { Loader2 } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"



const ModalReceber = ({pedidos}: {pedidos: Order[]}) => {
    const [recebidoPor, setRecebidoPor] = useState('')
    const [recebidoEm, setRecebidoEm] = useState('')
    const [loading, setLoading] = useState(false)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const open = searchParams.get('receber') === 'open'
    const idPedido = searchParams.get('id') ?? ''
 
    const pedido = pedidos.find((pedido) => pedido.id === Number(idPedido))

    
    useEffect(() => {        
        setRecebidoEm(dateToISO(pedido?.shipping?.receivedAt || ''))
        console.log(dateToISO(pedido?.shipping?.receivedAt || ''))
        setRecebidoPor(pedido?.shipping?.receivedBy ?? '')
    }, [open])
    
    useEffect(() => {
        if (pedido?.shipping) {            
            pedido.shipping.receivedAt = new Date(recebidoEm)
        }
    }, [recebidoEm])
    
    useEffect(() => {
        if (pedido?.shipping) {            
            pedido.shipping.receivedBy = recebidoPor
        }
    }, [recebidoPor])
    
    const fechar = async () => {
        router.push(pathname)
    }

    const handleReceber = async () => {
        if (!pedido) return
        if(!confirm('Deseja Confirmar o recebimento do pedido?')) return
        try {
            setLoading(true)
            pedido.status = 'received'
            const res = await actionReceberPedido(pedido)
            if (!res) {
                alert('Erro ao receber pedido')
                return
            }
            
            fechar()            
        } catch (error:any) {
            throw new Error(error.message)
        }finally {
            setLoading(false)
        }
    }

    if (!pedido) return <></>

    return (
        <Modal 
            show={open}
            buttons={<></>}
            title="Confirmar recebimento do pedido"
            type="none"

        >
            <div className="flex flex-col gap-2">
                <h1>Pedido #{pedido.id}</h1>
                <div className="w-full">
                    <span>Recebido Por:</span>
                    <input 
                        type="text" 
                        className="border border-borda rounded-md w-full p-2"
                        placeholder="Ex: João Paulo da Costa (Porteiro)"
                        value={ recebidoPor }
                        onChange={(e) => { setRecebidoPor(e.target.value) }}
                    />
                </div>
                <div className="w-full">
                    <span>Data do Recebimento:</span>
                    <input 
                        type="date" 
                        className="border border-borda rounded-md w-full p-2"
                        value={ recebidoEm }
                        onChange={(e) => { setRecebidoEm(e.target.value) }}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        className="bg-blue-700 text-white hover:bg-blue-600 rounded-md px-4 py-2 mt-4"
                        onClick={ handleReceber}
                        >
                        {loading ? <Loader2 className="animate-spin"/> : 'Receber'}
                    </button>
                    <button
                        className="bg-borda border border-texto-label text-texto-label rounded-md px-4 py-2 mt-4"
                        onClick={fechar}
                    >
                        Fechar
                    </button>
                </div>
            </div>
        </Modal>    
    )
}

export default ModalReceber