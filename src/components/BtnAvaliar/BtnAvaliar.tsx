'use client'

import { Order, OrderProduct, Review } from "@/types/types"
import { actionAvaliarProduto } from "@/actions/produtos/actionAvaliarProduto"
import { useEffect, useState } from "react"
import Button from "@/components/genericos/Buttons/Button"

type TProdutosAvaliar = {
    order: Order,
    orderProduct: OrderProduct,
    review: Review
}

const BtnAvaliar = ( {item}: {item: TProdutosAvaliar}) => {
    const [ comment, setComment] = useState('')
    const [ stars, setStars] = useState(0)
    const [ isLoading, setIsLoading] = useState(false)
    const [ error, setError] = useState(false)
    const [ sucess, setSucess] = useState(false)

    useEffect(() => {
        setStars(item.review.rating)
        setComment(item.review.comment || '')
    }, [item])
    
    const handleClickEnviar = async () => {
        try {
            setIsLoading(true)
            const newReview:Review = {
                id: item.review.id? item.review.id : 0,
                rating: stars,
                comment: comment,
                idOrder: item.order.id? item.order.id : 0,
                idProduct: item.orderProduct.idProduct,
                date: new Date(),            
            }
    
            const res = await actionAvaliarProduto(newReview)
            if(!res){
                setError(true)
                return
            }
            setSucess(true)
        } catch (error) {
            console.log(error)
            setError(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-start gap-1 my-4">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} 
                        className={`${ star <= (stars || -1)? 'text-yellow-400': 'text-borda'} 
                        text-xl hover:scale-150 transition`}
                        onClick={ () => { setStars(star) } }
                    >
                        ★
                    </button>                    
                ))}
                <span className="text-sm text-texto-label ml-5">quantas estrelas este produto merece?</span>
            </div>
            <textarea  rows={3} 
                className="w-full border border-borda rounded-md p-2 mb-2" 
                placeholder="Deixe um comentário sobre o produto" 
                value={comment}
                onChange={ (e) => { setComment(e.target.value) } }
            />
            <div className="flex w-full justify-end">
                <Button 
                    loading={isLoading}
                    disabled={isLoading || stars === 0}
                    error={error} sucess={sucess}
                    setError={setError} setSucess={setSucess}
                    onClick={ handleClickEnviar }
                >
                    Avaliar
                </Button>                
            </div>
        </div>
    )
}

export default BtnAvaliar