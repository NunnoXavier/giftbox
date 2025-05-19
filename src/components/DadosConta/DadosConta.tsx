'use client'

import { useEffect, useState } from "react"
import { dateBrToISO, toDateBr } from "@/services/utils"
import { User } from "@/types/types"
import { Loader2, UserIcon, AtSignIcon, MapPin, CreditCard } from "lucide-react"

type UserDTO = {
    firstName: string
    lastName: string
    birthday: Date
    phone: string
    address: string
    city: string
    state: string
    obs: string
    cardNumber: string
    cardHolderDoc: string
    cardExpire: string
    cardCvv: number
    cardHolderName: string
    postalCode: string
}

type DadosContaProps = {
    usuario: User,
    fnSalvarDados: (user:UserDTO) => Promise<boolean>
}

const DadosConta = ({usuario, fnSalvarDados}:DadosContaProps) => {
    const [ loading, setLoading ] = useState(false)

    const [nome, setNome] = useState('')
    const [sobrenome, setSobrenome] = useState('')
    const [nascimento, setNascimento] = useState('')
    const [fone, setFone] = useState('')
    
    const [email, setEmail] = useState('')

    const [cep, setCep] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [obs, setObs] = useState('')
    
    const [cartao, setCartao] = useState('')
    const [nomeCartao, setNomeCartao] = useState('')
    const [cpfCnpj, setCpfCnpj] = useState('')
    const [vencimento, setVencimento] = useState('')
    const [cvv, setCvv] = useState('')

    useEffect(() => {
        setNome(usuario.firstName || "")
        setSobrenome(usuario.lastName || "")
        setNascimento(toDateBr(usuario.birthday) || "")
        setFone(usuario.phone || "")
        setEmail(usuario.email || "")
        setCep(usuario.postalCode || "")
        setEndereco(usuario.address || "")
        setCidade(usuario.city || "")
        setUf(usuario.state || "")
        setObs(usuario.obs || "")
        setCartao(usuario.cardNumber || "")
        setNomeCartao(usuario.cardHolderName || "")
        setCpfCnpj(usuario.cardHolderDoc || "")
        setVencimento(usuario.cardExpire || "")
        setCvv(usuario.cardCvv?.toString() || "")
    }, [])

    const buscarEndereco = async () => {
        try {
            setLoading(true)
            const response = await fetch('http://localhost:3000/api/busca-cep?cep=' + cep)
            const { data } = await response.json()
            setEndereco(data.logradouro)
            setCidade(data.localidade)
            setUf(data.uf)
            
        } catch (error) {
            return
        } finally {
            setLoading(false)
        }
    }

    const salvar = async () => {        
        try {            
            setLoading(true)
            const dadosUsuario = {
                firstName: nome,
                lastName: sobrenome,
                birthday: new Date(dateBrToISO(nascimento)),
                phone: fone,
                address: endereco,
                city: cidade,
                state: uf,
                obs: obs,
                cardNumber: cartao,
                cardHolderDoc: cpfCnpj,
                cardExpire: vencimento,
                cardCvv: Number(cvv),
                cardHolderName: nomeCartao,
                postalCode: cep,                    
            }

            const salvou = await fnSalvarDados(dadosUsuario)
            if (salvou) {
                alert('Dados salvos com sucesso!')
            } else {
                alert('Erro ao salvar os dados!')
            }
        } catch (error) {
            console.log(error)
            return
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`bg-white ${loading ? 'cursor-progress' : 'cursor-default'} 
        p-8 max-w-4xl mx-auto rounded-lg shadow-md`}>
          {/* SEÇÃO: Dados Pessoais */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-texto border-b pb-2 mb-6"> 
                <UserIcon className="w-5 h-5 inline-block mr-2" />
                Dados Pessoais
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-texto">Nome</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-borda2"
                />
              </div>
              <div>
                <label className="text-sm text-texto">Sobrenome</label>
                <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-borda2"
                />
              </div>
              <div>
                <label className="text-sm text-texto">Nascimento</label>
                <input type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-borda2"
                />
              </div>
              <div>
                <label className="text-sm text-texto">Telefone</label>
                <input type="tel" value={fone} onChange={(e) => setFone(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-borda2"
                />
              </div>
            </div>
          </section>
      
          {/* SEÇÃO: Conta */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-texto border-b pb-2 mb-6">
                <AtSignIcon className="w-5 h-5 inline-block mr-2" />
                Conta
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-sm text-texto">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-borda2"
                />
              </div>
            </div>
          </section>
      
          {/* SEÇÃO: Endereço */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-texto border-b pb-2 mb-6">
                <MapPin className="w-5 h-5 inline-block mr-2" />
                Endereço de Entrega
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-texto">CEP</label>
                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
                <span
                  className="text-texto-link text-xs cursor-pointer hover:underline mt-1 inline-block"
                  onClick={() => buscarEndereco()}
                >
                  Buscar Endereço
                </span>
              </div>
              <div>
                <label className="text-sm text-texto">Endereço</label>
                <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-texto">Cidade</label>
                <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-texto">UF</label>
                <input type="text" value={uf} onChange={(e) => setUf(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-texto">Complemento / Observações</label>
                <input type="text" value={obs} onChange={(e) => setObs(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
            </div>
          </section>
      
          {/* SEÇÃO: Pagamento */}
          <section className="mb-10">
            <h2 className="text-lg font-bold text-texto border-b pb-2 mb-6">
                <CreditCard className="w-5 h-5 inline-block mr-2" />
                Dados de Pagamento
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-texto">Número do Cartão</label>
                <input type="text" value={cartao} onChange={(e) => setCartao(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-texto">Nome no Cartão</label>
                <input type="text" value={nomeCartao} onChange={(e) => setNomeCartao(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-texto">CPF/CNPJ</label>
                <input type="text" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-texto">Vencimento</label>
                <input type="text" value={vencimento} onChange={(e) => setVencimento(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-texto">CVV</label>
                <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} 
                  className="w-full border border-borda rounded-lg px-4 mt-1"
                />
              </div>
            </div>
          </section>
      
          <div className="flex justify-center">
            <button
              className="bg-texto2 hover:bg-borda2 text-white font-bold px-6 py-3 rounded-lg transition"
              onClick={salvar}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Salvar"}
            </button>
          </div>
        </div>
      )
      
}

/*
                cardExpire varchar(5),
                cardcvv numeric(3) default 0,
*/

export default DadosConta