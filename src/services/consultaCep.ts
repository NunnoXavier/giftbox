import { CepProps, CoordProps } from "@/types/types"

type  ResultCep = {data:CepProps|null, error: string|null}

export const dadosCep = async (cep: string):Promise<ResultCep> => {
    try {
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const response = await fetch(url)
        const json = await response.json()
        const result = {
            cep: json.cep,
            logradouro: json.logradouro,
            bairro: json.bairro,
            localidade: json.localidade,
            uf: json.uf,
            ibge: json.ibge,
            gia: json.gia,
            ddd: json.ddd,
            siafi: json.siafi,
            complemento: json.complemento,
            estado: json.uf,
            regiao: json.regiao,
            unidade: json.unidade,
        }   
        
        return { data:result, error: null }
    } catch (error:any) {
        return { data:null, error: error.message }
    }
}

type  ResultCoord = {data:CoordProps|null, error: string|null}

export const coordenadasCep = async (cep: string):Promise<ResultCoord> => {
    try {
        if(cep.length < 8){
            return { data:null, error: "CEP inválido" }
        }

        const { data:infoCep, error:errorCep } = await dadosCep(cep)
        if(!infoCep){
            return { data:null, error: errorCep }
        }

        const endereco = `${infoCep.logradouro}, ${infoCep.localidade} - ${infoCep.uf}`
        .replaceAll(" ", "+")
        
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${endereco},+Brasil&format=json`)
        if(!res.ok){
            return { data:null, error: "Erro ao consultar CEP: status: " + res.status }
        }
        const json = await res.json()
        if(json.length === 0){
            return { data:null, error: `CEP ${cep} não encontrado` }
        }

        const result = {
            lat: json[0].lat,
            lon: json[0].lon,
        } 
        return { data:result, error: null }
    } catch (error:any) {
        return { data:null, error: error.message }
    }
}