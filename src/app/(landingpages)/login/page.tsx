'use client'

import { LoaderCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")

  const verificar = async () => {
    try {
      setMensagem("")
      setLoading(true)
      const res = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { "Content-type": "Application-json" },
        body: JSON.stringify({ email: email, password: senha }),
        cache: "no-cache"
      })

      if (res.status !== 200) {
        const data = await res.json()
        setMensagem(data.error)
      } else {
        const { data, error } = await res.json()
        if (!data) {
          setMensagem(error)
        } else {
          sessionStorage.clear() // Limpa o cache do navegador
          router.push("/dashboard")
        }
      }
    } catch (error: any) {
      setMensagem(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-transparent">
      
      {/* Lado esquerdo - branding */}
      <div className="bg-transparent flex flex-col justify-evenly items-center p-10 text-center">
      <Image
          src="/logo-novo-cinza.svg"
          alt="Giftbox"
          className="w-3/4 max-w-sm rounded-xl "
          width={500}
          height={500}
        />
        <h1 className="text-4xl font-extrabold text-texto2 mb-4">Bem-vindo à Si Giftbox</h1>
        <p className="text-texto text-lg max-w-md mb-6">
          Presentes sofisticados para momentos especiais. Faça login para criar ou gerenciar suas giftboxes.
        </p>
        <p className="italic text-purple-800 text-base max-w-md mb-6">
          “Cada presente é um gesto de amor — entregue com cuidado, recebido com emoção.”
        </p>
      </div>

      {/* Lado direito - login */}
      <div className="flex items-center justify-center px-6 bg-transparent">
        <div className="bg-white border border-borda rounded-xl shadow-md p-8 w-full max-w-md">
          <h2 className="text-2xl text-center font-bold text-texto mb-6">Acesse sua conta</h2>

          <div className="space-y-4">
            <input
              placeholder="email. ex: joaodasilva@giftbox.com"
              type="email"
              id="email"
              className="w-full border border-borda focus:border-borda2 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />

            <input
              placeholder="senha"
              type="password"
              id="senha"
              className="w-full border border-borda focus:border-borda2 rounded-lg px-4 py-2 text-texto placeholdertexto-label"
              value={senha}
              onChange={(e) => setSenha(e.currentTarget.value)}
            />

            <button
              disabled={loading}
              onClick={verificar}
              className={`w-full bg-texto2 hover:bg-borda2 transition text-white font-semibold rounded-lg h-11 flex items-center justify-center relative ${
                loading ? "opacity-70" : ""
              }`}
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <span>Entrar</span>
              )}
            </button>

            {mensagem && (
              <p className="text-center text-texto-alerta text-sm mt-2">{mensagem}</p>
            )}

            <div className="flex justify-between text-sm text-texto-link mt-4">
              <Link href="/recuperar-senha" className="hover:underline">
                Esqueci minha senha
              </Link>
              <Link href="/cadastrar" className="hover:underline">
                Ainda não tenho cadastro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
