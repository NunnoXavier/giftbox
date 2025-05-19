'use client'
import { Loader2, Truck } from "lucide-react"
import { useState } from "react"
import { maskCep } from "@/services/useMask"
import { filtraNumeros } from "@/services/utils"
import { calcularFrete } from "@/services/calcularFrete"
import { dadosCep } from "@/services/consultaCep"

const CalcFrete =() => {
    const [ cep, setCep ] = useState("")
    const [ textoFrete, setTextoFrete ] = useState("")
    const [ textoEndereco, setTextoEndereco ] = useState("")
    const [ carregando, setCarregando ] = useState(false)
    
    const calcular = async() => {
        setCarregando(true)
        try {            
            setTextoFrete("")
            setTextoEndereco("")
    
            const numCep = filtraNumeros(cep)
    
            if(numCep.length < 8){
                setTextoFrete("Cep Inválido")
                setTextoEndereco("")
                return
            }
    
            const { data:infoCep, error:erroinfoCep } = await dadosCep(numCep)
    
            if(!infoCep){
                console.log(erroinfoCep)
                setTextoFrete("CEP não encontrado")
                setTextoEndereco(erroinfoCep || "")
                return
            }            
            const valorFrete = await calcularFrete(numCep)    
            setTextoEndereco(`${infoCep.logradouro}, ${infoCep.localidade} - ${infoCep.uf}`)
            setTextoFrete(`Frete: R$ ${valorFrete.toFixed(2)}`)
            
        } catch (error:any) {
            console.log(error.message)
            setTextoFrete("Erro ao consultar CEP")

        }finally{
            setCarregando(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-2">
            <h1 className="flex gap-2 items-end text-sm text-texto-label"><Truck /> Calcular frete e prazo de entrega</h1>
            <div className="flex items-center justify-center space-x-2">
                <input 
                    type="text" 
                    className="border border-borda text-center rounded-lg px-2 py-1" 
                    placeholder="CEP" 
                    value={ maskCep(cep) }
                    onChange={(e) => setCep(e.target.value)}
                />
                <button 
                className="bg-texto2 w-30 hover:bg-borda2 text-white font-bold py-2 px-4 rounded"
                onClick={() => {calcular()}}
                >
                    { carregando? (<Loader2 className="animate-spin m-auto" />) : 'Calcular'}
                </button>
            </div>
            <p className="text-sm">{ textoEndereco }</p>
            <h3 className="font-bold text-texto-link">{ textoFrete }</h3>
        </div>
        
    )

}

export default CalcFrete

/*
                    <div className="flex flex-col gap-2 place-items-center">
                        <span className="flex gap-2"> <Truck /> Calcular Frete e prazo</span>  
                        <div className="flex bg-background pl-2 text-center focus:border focus:border-borda2 rounded-xl">
                            <input className="outline-0 appearance-none caret-borda2 text-texto2  w-36" type="text" 
                                placeholder="digite o seu cep"
                            />
                            <button className="flex-1 flex gap-2 justify-center place-items-center bg-borda2 text-white px-5 rounded-xl">Calcular</button>
                        </div>  
                    </div>

*/
