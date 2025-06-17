'use client'

import Modal from "@/components/Modal/Modal"
import useAddEndereco from "./useAddEndereco"
import InputText from "@/components/genericos/Inputs/InputText"
import { User } from "@/types/types"

const ModalAddEndereco = ({initialValue}: {initialValue?: User}) => {

    const dados  = useAddEndereco(initialValue)    
   
    return (
        <Modal 
            show={dados.open}
            title="Instruções de Entrega"
            type="none"
        >
            <form onSubmit={dados.salvar}>
                <div className="flex flex-col gap-2">
                    <div className="w-full">
                        <span>Endereço de entrega</span>
                        <InputText 
                            name="endereco"
                            placeHolder="Ex: Rua Oscar Freire, 2000"
                            value={dados.usuario?.address || ""}
                        />
                    </div>
                    <div className="w-full">
                        <span>Cidade / UF</span>
                        <div className="flex gap-2">
                            <InputText
                                name="cidade" 
                                className="w-5/6"
                                placeHolder="Ex: São Paulo"
                                value={dados.usuario?.city || ""}
                            />
                            <InputText 
                                name="estado"
                                className="w-1/6"
                                placeHolder="Ex: SP"
                                value={dados.usuario?.state || ""}                                
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <span>CEP / Complemento</span>
                        <div className="flex gap-2">
                            <InputText 
                                name="cep"
                                className="w-2/6"
                                placeHolder="Ex: 05037001"
                                value={dados.usuario?.postalCode || ""}
                            />
                            <InputText 
                                name="complemento"
                                className="w-4/6"
                                placeHolder='Ex: "Apto 120" ou "terreo/fundos"'
                                value={dados.usuario?.obs || ""}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end text-sm gap-3 mt-4">
                    <button 
                        className="border border-borda rounded-full px-3 py-1"
                        onClick={dados.fechar}
                    >
                            Fechar
                        </button>
                    <button 
                        className="border border-borda rounded-full bg-texto2 text-white px-3 py-1"
                        type="submit"
                    >
                        Salvar instruções
                    </button>
                </div>                        
            </form>
        </Modal>    
    )
}

export default ModalAddEndereco