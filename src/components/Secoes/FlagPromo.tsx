type FlagPromoProps = {
    className?: string,
    perc: number,
    visible?: boolean,
}

const FlagPromo = ({ className, perc, visible }: FlagPromoProps) => {
    return (
        <div 
            className={`${className} ${ visible? 'block': 'hidden' } 
            absolute text-xs font-bold text-white bg-texto-alerta px-2 rounded-lg -rotate-24 
            -left-4 top-2 z-10`}
        >
            {perc.toFixed(2)}% OFF
        </div>
    )
}

export default FlagPromo