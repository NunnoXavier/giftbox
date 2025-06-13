export const actionVerificarToken = async (token: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/usuarios/confirmar-cadastro/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    
    
        const { data, error }:{data:number, error:string} = await res.json()
        if(error) {
            console.log(error)
            return 0
        }
        return data
        
    } catch (error: any) {
        console.log(error.message)        
        return 0
    }
}