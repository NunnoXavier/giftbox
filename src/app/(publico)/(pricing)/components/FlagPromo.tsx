type FlagPromoProps = {
    className?: string,
    perc: number,
    visible?: boolean,
}

const FlagPromo = ({ className, perc, visible }: FlagPromoProps) => {
    return (
        <div 
            className={`${className} ${ visible? 'block': 'hidden' } 
            absolute text-xs font-light text-wrap w-12 h-12 flex items-center justify-center
            text-white bg-rose-800 px-2 
            rounded-full 
            right-2 top-2 z-10`}
        >
            {Math.round(perc)}% OFF
        </div>
    )
}

export default FlagPromo