import { fetchReviews } from "@/cachedFetchs/fetchReviews"
import { toDateBr } from "@/services/utils"
import AvaliacaoProduto from "./AvaliacaoProduto"

const Reviews = async ({ idProduto }: { idProduto?: number }) => {
    const reviews = await fetchReviews(idProduto)
   
    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                {
                    reviews.map((review) => (
                        <div key={review.id} className="flex flex-col border-b border-gray-300 py-8">                           
                            <div>
                                <span className="text-texto font-semibold">
                                    {review.reviewerName}
                                </span>
                                <span>{" "}</span>
                                <span className="text-texto-label">
                                    {toDateBr(review.date)}
                                </span>
                                <AvaliacaoProduto rating={review.rating}/>
                            </div>
                            <p className="text-gray-500 mt-4">{review.comment}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Reviews