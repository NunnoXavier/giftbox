'use client'

import Link from "next/link"
import InputText from "../genericos/Inputs/InputText"
import InputPassword from "../genericos/Inputs/InputPassword"
import { LoaderCircle } from "lucide-react"
import useFormLogin from "./useFormLogin"

const FormLogin = () => {

    const dados = useFormLogin()


    return(
        <form 
            onSubmit={dados.handleSubmit}
            className="bg-white border border-borda rounded-xl shadow-md p-8 w-full max-w-md"
        >
          <h2 className="text-2xl text-center font-bold text-texto mb-6">Acesse sua conta</h2>

          <div className="space-y-4">
            <InputText
              placeHolder="email. ex: joaodasilva@giftbox.com"
              type="email"
              name="email"
              className="w-full border border-borda focus:border-borda2 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
            />

            <InputPassword
              name="senha"
              className="w-full border border-borda focus:border-borda2 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
            />

            <button
                type="submit"
                disabled={dados.loading}
                className={`w-full bg-texto2 hover:bg-borda2 transition text-white font-semibold rounded-lg h-11 flex items-center justify-center relative ${
                    dados.loading ? "opacity-70" : ""
              }`}
            >
              {dados.loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Entrar</span>
              )}
            </button>

            {dados.mensagem && (
              <p className="text-center text-texto-alerta text-sm mt-2">{dados.mensagem}</p>
            )}

            <div className="flex justify-between text-sm text-texto-link mt-4">
              <Link href="/recuperar-senha" className="hover:underline">
                Esqueci minha senha
              </Link>
              <Link href="/cadastrar/verificar-email" className="hover:underline">
                Ainda não tenho cadastro
              </Link>
            </div>
          </div>
        </form>        
    )
}

export default FormLogin