export const actionLogin  = async (email: string, senha: string): Promise<string> => {
    try {
        const res = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { "Content-type": "Application-json" },
            body: JSON.stringify({ email: email, password: senha }),
            cache: "no-cache"
        })

        const { data, error }:{data: string, error: string} = await res.json()
        if (!data) {
            console.log(error)
            return ''
        }

        return data

        } catch (error : any) {
        console.log(error.message)
        return ''
    }
}