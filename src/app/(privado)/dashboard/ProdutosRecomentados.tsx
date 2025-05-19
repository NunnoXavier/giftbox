import Image from "next/image"

const ProdutosRecomendados = async () => {

    return (
        <section className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Para Sua Próxima Compra</h2>
            <div className="max-h-[28rem] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {Array.from({ length: 12 }).map((_, produto) => (
                <div key={produto} className="border border-borda rounded-lg p-3 hover:shadow transition">
                    <Image
                    width={200}
                    height={200}
                    src="/images/placeholder.jpeg"
                    alt="Produto"
                    className="w-full h-32 object-cover rounded mb-2"
                    />
                    <h3 className="text-sm font-medium text-text">Produto #{produto + 1}</h3>
                    <p className="text-xs text-texto-label">Categoria</p>
                    <p className="text-sm font-bold text-texto2 mt-1">R$ 99,90</p>
                </div>
                ))}
            </div>
            </div>
        </section>        
    )
}

export default ProdutosRecomendados