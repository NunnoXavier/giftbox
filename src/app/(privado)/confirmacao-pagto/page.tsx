const ConfirmacaoPagto = () => {
    return (
        <div className="bg-white w-md md:w-lg rounded-lg m-auto p-4">
            <h1 className="font-semibold text-xl text-gray-700 text-center mb-2">Transação Concluída</h1>
            <h2 className="text-md">Seu pegamento está em análise. Você receberá a confirmação no seu email.</h2>
            <p>
                Você também pode acompanhar status da sua compra no menu 
                <a href="/pedidos" className="font-semibold text-blue-500" > pedidos</a>
            </p>
        </div>
    )
}

export default ConfirmacaoPagto