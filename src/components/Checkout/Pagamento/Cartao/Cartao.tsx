'use client'

import { User } from "@/types/types"
import { cpfCnpj, cartao, validadeCartao, apenasNumeros } from "@/services/useMask"
import useCartao from "./useCartao"
import InputText from "@/components/genericos/Inputs/InputText"


const Cartao = ({ initUser }: { initUser:User }) => {

    const data = useCartao(initUser)
    
    return (
        <form onSubmit={data.salvar}>
            <h1 className="font-semibold  mb-2">Cartão selecionado</h1>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <input type="hidden" name="paymentMethod" value={initUser.paymentMethod} />
                    <div className="flex flex-col w-5/12">
                        <span className="text-sm">CPF/CNPJ do Titular</span>
                        <InputText 
                            name="cardHolderDoc"
                            className="border border-borda rounded-md px-2"
                            value={initUser.cardHolderDoc}
                            mask={cpfCnpj}
                            onBlur={(v) => v !== initUser.cardHolderDoc && data.setSalvo(false)}
                        />
                    </div>
                    <div className="flex flex-col w-7/12">
                        <span className="text-sm">Nome Completo do Titular</span>
                        <InputText 
                            name="cardHolderName"
                            className="border border-borda rounded-md px-2"
                            value={initUser.cardHolderName}
                            onBlur={(v) => v !== initUser.cardHolderName && data.setSalvo(false)}
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col w-6/12">
                        <span className="text-sm">Número do Cartão</span>
                        <InputText 
                            name="cardNumber"
                            className="border border-borda rounded-md"
                            value={apenasNumeros(initUser.cardNumber)}
                            mask={cartao}
                            onBlur={(v) => v !== initUser.cardNumber && data.setSalvo(false)}
                        />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <span className="text-sm">Validade</span>
                        <InputText 
                            name="cardExpire"
                            className="border border-borda rounded-md"
                            placeHolder="dd/aa"
                            value={initUser.cardExpire}
                            mask={validadeCartao}
                            onBlur={(v) => v !== initUser.cardExpire && data.setSalvo(false)}
                        />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <span className="text-sm">CVV</span>
                        <InputText
                            name="cardCvv"
                            className="border border-borda rounded-md"
                            value={initUser.cardCvv?.toString()} 
                            onBlur={(v) => v !== initUser.cardCvv?.toString() && data.setSalvo(false)}                           
                        />
                    </div>
                    <div className="flex flex-col w-2/12">
                        <span className="text-sm">Qtd.Parc.</span>
                        <InputText
                            name="parc"
                            className="border border-borda rounded-md"
                            value={ initUser.cardParc?.toString() } 
                            onBlur={(v) => v !== initUser.cardParc?.toString() && data.setSalvo(false)}                           
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-end py-2">
                <button 
                    className={`${data.salvo? 'bg-white text-texto-label':'bg-texto2 text-white'} border  text-sm   py-1 px-4 rounded-full `}
                    type="submit"
                >
                    Salvar dados do Cartão
                </button>
            </div> 
        </form>        
    )
}

export default Cartao