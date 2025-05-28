'use server'

export const actionAlterarPreco = async ({ id, price, discountPercentage }: 
{ id: number, price: number, discountPercentage: number }) => {

    try {
        const res = await fetch('http://localhost:3000/api/produtos/precos',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                price,
                discountPercentage
            })
        })
    
        if (!res.ok) {
            throw new Error('Erro ao alterar preço')
        }
    
        const { data, error }  = await res.json()
        if (!data) {
            console.log(error)
            throw new Error(error)
        }
    
        return data
        
    } catch (error:any) {
        console.log(error.message)
        throw new Error(error.message)
    }    
}