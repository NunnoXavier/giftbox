import FormasDePagto from "./FormasDePagto"

const Pagamento = async () => {

    return (
        <div className="bg-white flex flex-col border border-gray-200 w-full rounded-md p-4">
            <h1 className="font-bold mb-2">{`Forma de Pagamento`}</h1>
            <FormasDePagto />            
        </div>
    )
}

export default Pagamento