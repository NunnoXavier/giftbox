'use client'

import { dateToISO } from "@/services/utils"
import { User } from "@/types/types"
import { UserIcon, AtSignIcon, MapPin, CreditCard } from "lucide-react"
import InputText from "../genericos/Inputs/InputText"
import InputDate from "../genericos/Inputs/InputDate"
import InputFone from "../genericos/Inputs/InputFone"
import { cartao, cpfCnpj, maskCep, validadeCartao } from "@/services/useMask"
import InputNumber from "../genericos/Inputs/InputNumber"
import Button from "../genericos/Buttons/Button"
import useDadosConta from "./useDadosConta"

/**
 * DadosConta component renders a form for managing user account details.
 * 
 * @component
 * @param {Object} props - Component properties
 * @param {User} props.usuario - The user object containing account information
 * @returns {React.ReactElement} A form with sections for personal data, account, delivery address, and payment details
 */
const DadosConta = ({usuario}: {usuario: User}) => {
    
    const data = useDadosConta({usuario})

    return (
        <form onSubmit={data.salvar}
        className={`bg-white ${data.loading ? 'cursor-progress' : 'cursor-default'} 
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
                <InputText 
                  value={usuario.firstName}
                  name="firstName"                 
                />
              </div>
              <div>
                <label className="text-sm text-texto">Sobrenome</label>
                <InputText
                  name="lastName"                
                  value={usuario.lastName} 
                />
              </div>
              <div>
                <label className="text-sm text-texto">Nascimento</label>
                <InputDate 
                  name="birthday" 
                  value={dateToISO(usuario.birthday)}
                />
              </div>
              <div>
                <label className="text-sm text-texto">Telefone</label>
                <InputFone 
                  value={usuario.phone || ""}
                  name="phone"
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
                <InputText 
                  type="email" 
                  name="email"
                  value={usuario.email}
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
                <InputText 
                value={usuario.postalCode} 
                 state={data.cep}
                 setStateFn={data.setCep}
                  name="postalCode"
                  mask={maskCep}
                />
                <button type="button"
                  className="text-texto-link text-xs cursor-pointer hover:underline mt-1 inline-block"
                  onClick={() => data.buscarEndereco()}
                >
                  Buscar Endereço
                </button>
              </div>
              <div>
                <label className="text-sm text-texto">Endereço</label>
                <InputText
                  value={usuario.address}
                  state={data.endereco}
                  name="address"
                  setStateFn={(value) => {
                    console.log(value)
                    data.setEndereco(value)
                  }}
                />
              </div>
              <div>
                <label className="text-sm text-texto">Cidade</label>
                <InputText
                  state={data.cidade} 
                  value={usuario.city}
                  name="city"
                  setStateFn={(value) => data.setCidade(value)}
                />
              </div>
              <div>
                <label className="text-sm text-texto">UF</label>
                <InputText
                  state={data.uf}
                  value={usuario.state}
                  name="state"
                  setStateFn={data.setUf}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-texto">Complemento / Observações</label>
                <InputText 
                  value={usuario.obs} 
                  name="obs"
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
                <InputText                   
                  value={usuario.cardNumber?.toString()} 
                  name="cardNumber"
                  mask={cartao}
                />
              </div>
              <div>
                <label className="text-sm text-texto">Nome no Cartão</label>
                <InputText 
                  value={usuario.cardHolderName}
                  name="cardHolderName"
                />
              </div>
              <div>
                <label className="text-sm text-texto">CPF/CNPJ</label>
                <InputText
                  value={usuario.cardHolderDoc}
                  name="cardHolderDoc"
                  mask={cpfCnpj}
                />
              </div>
              <div>
                <label className="text-sm text-texto">Vencimento</label>
                <InputText 
                  value={usuario.cardExpire}
                  name="cardExpire"
                  mask={validadeCartao}
                />
              </div>
              <div>
                <label className="text-sm text-texto">CVV</label>
                <InputNumber
                  value={usuario.cardCvv?.toString() || ""}
                  name="cardCvv"
                  max={999}                  
                />
              </div>
            </div>
          </section>
      
          <div className="flex justify-center">
            <Button 
              type="submit"
              sucess={data.sucess} error={data.error} loading={data.loading}
              setError={data.setError} setSucess={data.setSucess}
            >
              salvar 
            </Button>
          </div>
        </form>
      )
      
}

export default DadosConta