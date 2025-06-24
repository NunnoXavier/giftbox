type AvaliacaoProdutoProps = {
    className?: string,
    rating?: number,
}

function contarEstrelas(rating: number){
    const estrelas = []
    for(let i=0; i < 5; i++){
        if(rating - i > 0){
            estrelas.push((<i key={i} className="text-yellow-400">★</i>))
        }else{
            estrelas.push((<i key={i} className="text-texto-label">★</i>))
        }    
    }

    return estrelas
}

const AvaliacaoProduto = ({ className, rating }:AvaliacaoProdutoProps) => {
    return (
        <div className={`${className} bg-white flex flex-col`}>
            <div className="flex space-x-2 text-texto-label">
                {
                    contarEstrelas(rating||0).map((estrela) => estrela)
                }
            </div>
        </div>
    )
}

export default AvaliacaoProduto