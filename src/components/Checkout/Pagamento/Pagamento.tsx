import FormasDePagto from "./FormasDePagto"

const Pagamento = async () => {

    return (
        <div className="bg-white flex flex-col border border-borda w-full rounded-md p-4 shadow-md">
            <h1 className="font-bold mb-2">{`Forma de Pagamento`}</h1>
            <FormasDePagto />            
        </div>
    )
}

export default Pagamento