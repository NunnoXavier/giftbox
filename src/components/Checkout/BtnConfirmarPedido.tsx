'use client'

const BtnConfirmarPedido = ({acao}:{acao:()=>void}) => {
    return  (
        <button  
            className="p-2 text-center text-sm bg-texto2 text-white rounded-2xl"
            onClick={() => acao()}                
            >Confirmar Pedido
        </button>        
    )
}

export default BtnConfirmarPedido