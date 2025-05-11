import { calcDistancia } from "./calcDistancia"
import { coordenadasCep } from "./consultaCep"


export const calcularFrete = async (cep: string):Promise<number> => {        
    const VLR_FRETE_KM = 3.25
    const meuCep = '05065110'

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

    const frete = distancia * VLR_FRETE_KM <= 25 ? 24.90 : distancia * VLR_FRETE_KM
    
    return frete
}

