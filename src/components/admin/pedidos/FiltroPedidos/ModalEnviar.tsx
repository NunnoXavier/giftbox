'use client'
import { actionEnviarPedido } from "@/actions/admin/pedidos/actionEnviarPedido"
import Modal from "@/components/Modal/Modal"
import { Order } from "@/types/types"
import { Loader2 } from "lucide-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"



const ModalEnviar = ({pedidos}: {pedidos: Order[]}) => {
    const [rastreio, setRastreio] = useState('')
    const [prazo, setPrazo] = useState('')
    const [loading, setLoading] = useState(false)

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const open = searchParams.get('enviar') === 'open'
    const idPedido = searchParams.get('id') ?? ''
 
    const pedido = pedidos.find((pedido) => pedido.id === Number(idPedido))

    
    useEffect(() => {        
        setPrazo(pedido?.shipping?.daysprev?.toString() ?? '')
        setRastreio(pedido?.shipping?.trackingCode ?? '')
    }, [open])
    
    useEffect(() => {
        if (pedido?.shipping) {            
            pedido.shipping.trackingCode = rastreio
        }
    }, [rastreio])
    useEffect(() => {
        if (pedido?.shipping) {            
            pedido.shipping.daysprev = Number(prazo)
        }
    }, [prazo])
    
    const fechar = async () => {
        router.push(pathname)
    }

    const handleEnviar = async () => {
        if (!pedido) return
        if(!confirm('Deseja enviar o pedido?')) return
        try {
            setLoading(true)
            pedido.status = 'sent'
            pedido.shipping!.date! = new Date()
            const res = await actionEnviarPedido(pedido)
            if (!res) {
                alert('Erro ao enviar pedido')
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
            title="Enviar pedido"
            type="none"

        >
            <div className="flex flex-col gap-2">
                <h1>Pedido #{pedido.id}</h1>
                <div className="w-full">
                    <span>Código de Rastreio</span>
                    <input 
                        type="text" 
                        className="border border-borda rounded-md w-full p-2"
                        placeholder="Ex: AA123456785BR"
                        value={ rastreio }
                        onChange={(e) => { setRastreio(e.target.value) }}
                    />
                </div>
                <div className="w-full">
                    <span>Prazo de Entrega (dias)</span>
                    <input 
                        type="number" 
                        className="border border-borda rounded-md w-full p-2"
                        value={ prazo }
                        onChange={(e) => { setPrazo(e.target.value) }}
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        className="bg-blue-700 text-white hover:bg-blue-600 rounded-md px-4 py-2 mt-4"
                        onClick={ handleEnviar}
                        >
                        {loading ? <Loader2 className="animate-spin"/> : 'Enviar'}
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

export default ModalEnviar