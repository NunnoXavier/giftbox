'use client'

import { useEffect, useState } from "react"
import { dateBrToISO, toDateBr } from "@/services/utils"
import { User } from "@/types/types"
import { Loader2 } from "lucide-react"

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
        <div className={ loading ? 'cursor-progress' : 'cursor-default' }>
            <div className="my-5 place-items-center">
                <h1 className="text-gray-600 font-bold">Dados Pessoais</h1>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Nome:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={nome} 
                            className="w-full px-2"
                            onChange={(e) => setNome(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Sobrenome:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={sobrenome} 
                            className="w-full px-2"
                            onChange={(e) => setSobrenome(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Nascimento:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="date" value={nascimento} 
                            className="w-full px-2"
                            onChange={(e) => setNascimento(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Fone:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="tel" value={fone} 
                            className="w-full px-2"
                            onChange={(e) => setFone(e.target.value)}  
                        />
                    </div>
                </div>
            </div>

            <div className="my-5 place-items-center">
                <h1 className="text-gray-600 font-bold">Dados da Conta</h1>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Email:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="email" value={email} 
                            className="w-full px-2"
                            onChange={(e) => setEmail(e.target.value)}  
                        />
                    </div>
                </div>
            </div>

            <div className="my-5 place-items-center">
                <h1 className="text-gray-600 font-bold">Dados para Entrega</h1>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">CEP:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={cep} 
                            className="w-full px-2"
                            onChange={(e) => setCep(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end w-full">
                    <span className="text-blue-600 text-xs cursor-zoom-in" onClick={() => buscarEndereco()}>Buscar Endereço</span>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Endereço:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={endereco} 
                            className="w-full px-2"
                            onChange={(e) => setEndereco(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Cidade:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={cidade} 
                            className="w-full px-2"
                            onChange={(e) => setCidade(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">UF:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={uf} 
                            className="w-full px-2"
                            onChange={(e) => setUf(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">OBS/Compl:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={obs} 
                            className="w-full px-2"
                            onChange={(e) => setObs(e.target.value)}  
                        />
                    </div>
                </div>
            </div>

            <div className="my-5 place-items-center">
                <h1 className="text-gray-600 font-bold">Dados de Pagamento</h1>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Nro Cartão:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={cartao} 
                            className="w-full px-2"
                            onChange={(e) => setCartao(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Nome (igual no cartão):</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={nomeCartao} 
                            className="w-full px-2"
                            onChange={(e) => setNomeCartao(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">CPF/CNPJ:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={cpfCnpj} 
                            className="w-full px-2"
                            onChange={(e) => setCpfCnpj(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">Vencimento:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={vencimento} 
                            className="w-full px-2"
                            onChange={(e) => setVencimento(e.target.value)}  
                        />
                    </div>
                </div>
                <div className="flex gap-2 justify-end mt-4 w-full">
                    <span className="text-gray-600">CVV:</span>
                    <div className="border border-gray-400 rounded-md">
                        <input type="text" value={cvv} 
                            className="w-full px-2"
                            onChange={(e) => setCvv(e.target.value)}  
                        />
                    </div>
                </div>
            
                < div className="flex gap-2 justify-center mt-4 w-full">
                    <button className="bg-blue-600 text-white font-bold px-4 py-2 rounded-md" onClick={() => salvar()}>Salvar</button>
                </div>            
            </div>
        </div>
    )
}

/*
                cardExpire varchar(5),
                cardcvv numeric(3) default 0,
*/

export default DadosConta