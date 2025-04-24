import { fetchPrecoProdutos } from "@/cachedFetchs/fetchsProdutos"
import TotalPedidos from "./TotalPedido"

const Checkout = async () => {
    const res = await fetchPrecoProdutos()
    const { data:precos, error } = await res.json()
    if(!precos){
        console.log(error)
        throw new Error('createQuerySacola: Não foi possível obter o preço atual dos produtos: ')
    }

    return (
        <div>
            <TotalPedidos precos={precos}/>
        </div>
    )
}

export default Checkout