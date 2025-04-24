import { toDateBr } from "@/services/utils"
import { Order } from "@/types/types"
import { cookies } from "next/headers"
import Pedido from "../../../components/Pedidos/Pedido"

const Pedidos = async ({ params }:{ params: Promise<{ id:string }> }) => {    
    const id = (await params).id
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get("SIGIFTBOX_AUTH_TOKEN")    
    const res = await fetch(`http://localhost:3000/api/pedidos`, {
        method: "GET",
        headers: { Cookie:`SIGIFTBOX_AUTH_TOKEN=${cookieToken?.value}` },
    })

    const { data, error }:{ data:Order[], error:string } = await res.json()

    if(!data){
        console.log(error)
        return (
            <h1>Ocorreu um erro ao buscar os pedidos. Tente mais tarde!</h1>
        )
    }

    return (
        <div>
            <h1 className="font-bold text-2xl text-gray-700 text-center">Seus Pedidos</h1>
            <div className="flex flex-col items-center w-full">
                {
                    data
                    .sort((a, b) => (Number(a.id) < Number(b.id)? 1 : -1))
                    .map((pedido) => (<Pedido key={pedido.id} pedido={ pedido } />))
                }
            </div>
        </div>
    )
}

export default Pedidos