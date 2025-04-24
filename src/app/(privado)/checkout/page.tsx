import Endereco from "@/components/Checkout/Endereco/Endereco"
import Pagamento from "@/components/Checkout/Pagamento/Pagamento"
import Resumo from "@/components/Checkout/Checkout"

const Checkout = async () => {

    return (
        <div className="flex not-md:flex-col justify-center gap-4">
            <div className="flex flex-col md:w-120 gap-4">
                <Endereco />
                <Pagamento />
            </div>
            <div className="md:w-96">
                <Resumo />
            </div>
        </div>
    )
}

export default Checkout