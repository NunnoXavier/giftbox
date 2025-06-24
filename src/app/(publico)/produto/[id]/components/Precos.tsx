import { toCurrencyBr } from "@/services/utils"

const Precos = ({promo, preco, visivel}:{promo:number, preco:number, visivel:boolean}) => {
    return (
        <div className={`${visivel? 'block' : 'hidden'} text-center`}>
            <h1 
                className={`${promo < preco? 'text-texto-label': 'text-transparent'} 
                text-sm `} 
            >
                <s>{toCurrencyBr(preco)}</s>
            </h1>
            <h1 
                className={`${promo < preco? 'text-texto-alerta': 'text-texto'} 
                text-3xl`} 
            >
                {toCurrencyBr(promo)}
            </h1>
        </div>        
    )
}

export default Precos