const Estoque = ({estoque}: {estoque: number}) => {
    return (
        <>
        <div className={`${estoque > 0? 'block' : 'hidden'} text-center`}>
            <span>{`${estoque} unidade${estoque !== 1? 's':''} em estoque`}</span>
        </div>
        <div className={`${estoque > 0? 'hidden' : 'block'} text-center text-texto-alerta`}>
            <span>INDISPONÍVEL</span>
        </div>
        </>
    )
}

export default Estoque