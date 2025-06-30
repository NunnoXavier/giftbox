'use server'

import { validarEmail } from "@/services/validarEmail"
import { validarSenha } from "@/services/validarSenha"

export const verificarEmailAction = async (email:string, senha:string):Promise<{  data:boolean|null , error:string|null }> => {
    try {
        if(!validarEmail(email)){
            return {data: null, error: 'Email inválido'}
        }

        const statusSenha = validarSenha(senha)
        
        if(!statusSenha.valido){
            return { data: null, error: statusSenha.mensagem }
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