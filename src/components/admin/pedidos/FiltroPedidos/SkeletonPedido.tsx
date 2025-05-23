const SkeletonPedido = () => {
    return (
        <>
            {
                [1,2,3,4,5,6].map((numero) => (
                    <div key={numero} className="bg-white shadow-md rounded-lg p-4">
                        <div className="animate-pulse">
                            <div className="h-4 bg-texto-label rounded-lg p-4 mb-2"></div>
                            <div className="h-4 bg-borda rounded-lg p-4 mb-2"></div>
                            <div className="h-4 bg-borda rounded-lg p-4 mb-2"></div>
                            <div className="h-4 bg-borda rounded-lg p-4 mb-2"></div>
                            <div className="h-4 bg-borda rounded-lg p-4 mb-2"></div>
                            <div className="h-4 bg-borda rounded-lg p-4 mb-2"></div>
                            <div className="h-4 bg-borda rounded-lg p-4 mb-2"></div>

                        </div>
                    </div>                
                ))            
            }
        </>
    )
}

export default SkeletonPedido