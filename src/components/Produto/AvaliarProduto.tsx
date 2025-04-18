import { Star, StarHalf } from 'lucide-react'


type AvaliarProdutoProps = {
    className?: string,
    rating?: number,
}

function contarEstrelas(rating: number){
    const estrelas = []
    for(let i=0; i < 5; i++){
        if(rating - i > 0){
            estrelas.push((<Star key={i} size={20} fill='gold'  strokeWidth={1}/>))
        }else{
            estrelas.push((<Star key={i} size={20} strokeWidth={1} />))
        }    
    }

    return estrelas
}

const AvaliarProduto = ({ className, rating }:AvaliarProdutoProps) => {
    return (
        <div className="flex flex-col place-items-center">
            <div className="flex space-x-2 text-gray-500">
                {
                    contarEstrelas(rating||0).map((estrela) => estrela)
                }
            </div>
            <span className='text-xs'>avaliar</span>
        </div>
    )
}

export default AvaliarProduto