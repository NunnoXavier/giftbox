import BtnVoltar from "@/components/genericos/ BtnVoltar"
import { Undo2 } from "lucide-react"

const FalhaPagto = () => {
    return (
        <div className="w-md md:w-lg m-auto">
            <div className="bg-white w-md md:w-lg rounded-lg m-auto p-4 shadow-md">
                <h1 className="font-semibold text-xl text-texto text-center mb-2">Transação Rejeitada</h1>
                <h2 className="text-md">Houve uma falha no pagamento.</h2>
                <p>
                    Tente novamente ou entre em contato com o suporte.
                </p>
            </div>
            <div className="w-md md:w-lg rounded-lg m-auto p-4">
                <a href="/checkout" className="flex gap-2 justify-center items-center">
                    
                    <BtnVoltar>
                        <Undo2/>                        
                    </BtnVoltar>
                </a>

            </div>
        </div>
    )
}

export default FalhaPagto