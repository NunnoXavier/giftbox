'use server'

import { validarEmail } from "@/services/validarEmail"

export const verificarEmailAction = async (email:string, senha:string):Promise<{  data:boolean|null , error:string|null }> => {
    try {
        if(!validarEmail(email)){
            return {data: null, error: 'Email inválido'}
        }

        if(senha.length < 6){
            return { data: null, error: 'A senha deve conter ao menos 6 caracteres, entre letras, números e símbolos!'}
        }

        const res = await fetch(`http://localhost:3000/api/usuarios/verificar-email/${email}`)
        const { data, error }:{ data:boolean, error:string } = await res.json()
        if(error){
            return  { data: null, error: error }
        }

        return { data: data, error: null }
    } catch (error:any) {
        return { data: null, error: error.message }
    }
}