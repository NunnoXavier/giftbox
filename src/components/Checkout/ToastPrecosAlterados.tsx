import { ProductCart } from "@/types/types"
import Alerta from "../Alerta/Alerta"


const ToastPrecosAlterados = ({produtosAlterados}:{produtosAlterados?: ProductCart[]}) => {

    if(!produtosAlterados || produtosAlterados.length === 0){
        return
    }

    return(       
        <div className="relative">
            {
                produtosAlterados.map((p, i) => (
                    <Alerta key={i} indice={i} visivel={true} >
                        <p>{`O Item "${p.title}" teve seu preço alterado.`}</p>
                    </Alerta>
                ))
            }
        </div>  
    )
}

export default ToastPrecosAlterados