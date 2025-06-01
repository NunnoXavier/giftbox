import { Dimensions } from "@/types/types"
import { calcDistancia } from "./calcDistancia"
import { coordenadasCep } from "./consultaCep"

const calcularArea = (dimensoes:Dimensions):number => {
    const { height:h, width:w, depth:d } = dimensoes
    
    const altura = h || 0
    const largura = w || 0
    const profundidade = d || 0

    return altura * largura * profundidade
}

export const calcularFrete = async (cep: string, peso?:number,dimensoes?: Dimensions):Promise<number> => {        
    const VLR_FRETE_KM = 3.25
    const VLR_FRETE_PESO = 0.50
    const VLR_MIN_FRETE = 24.90
    const VLR_FRETE_AREA = 0.005
    const meuCep = '05065110'
    const pesoPadraoGr = peso || 1
    const areaPadrao = dimensoes? calcularArea(dimensoes) : 100

    if(!cep){
        return  0
    }

    const { data:dadosCep1, error: errorCep1 } = await coordenadasCep(meuCep)    
    if (!dadosCep1) {
        console.log(errorCep1)
        throw new Error('Erro ao calcular frete')
    }
    const { data:dadosCep2, error: errorCep2 } = await coordenadasCep(cep)
    if (!dadosCep2) {
        console.log(errorCep2)
        throw new Error('Erro ao calcular frete')
    }
    
    const distancia = calcDistancia(
        dadosCep1.lat,
        dadosCep1.lon,
        dadosCep2.lat,
        dadosCep2.lon
    )

    const valorPeso = pesoPadraoGr * VLR_FRETE_PESO
    const valorArea = areaPadrao * VLR_FRETE_AREA /100
    const valorDistancia = distancia * VLR_FRETE_KM

    const somaValores = valorPeso + valorArea + valorDistancia

    const frete = somaValores <= VLR_MIN_FRETE ? VLR_MIN_FRETE 
    : somaValores
    
    return frete
}

