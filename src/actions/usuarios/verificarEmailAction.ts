'use server'

export const verificarEmailAction = async (email:string, senha:string) => {
    function validarEmail(email:string) {
        const padraoEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return padraoEmail.test(email)
    }        

    try {
        if(!validarEmail(email)){
            throw new Error('Email inválido')
        }

        if(senha.length < 6){
            throw new Error('A senha deve conter ao menos 6 caracteres, entre letras, números e símbolos!')
        }

        const res = await fetch(`http://localhost:3000/api/usuarios/verificar-email/${email}`)
        const { data, error }:{ data:boolean, error:string } = await res.json()
        if(error){
            throw new Error('erro ao validar email: ' + error)
        }

        return data // se data for true, significa que o email já existe
    } catch (error:any) {
        throw new Error(error.message)
    }
}