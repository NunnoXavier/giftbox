import { ProductCart } from "@/types/types"
import Alerta from "../Alerta/Alerta"

const ToastProdutosRemovidos = ({produtosRemovidos}:{produtosRemovidos?:ProductCart[]}) => {

    if(!produtosRemovidos || produtosRemovidos.length === 0){
        return 
    }

    return(
        <div className="relative">
            {
                produtosRemovidos.map((p, i) => (
                    <Alerta key={i} indice={i} visivel={true} >
                        <p>{`O Item "${p.title}" não está mais disponível.`}</p>
                    </Alerta>
                ))
            }

        </div>
    )
}

export default ToastProdutosRemovidos