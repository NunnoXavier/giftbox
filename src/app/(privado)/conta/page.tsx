import { fetchUsuario } from "@/cachedFetchs/fetchUsuario"
import DadosConta from "@/components/DadosConta/DadosConta"

const Conta = async () => {
    const usuario = await fetchUsuario()

    if(!usuario){
        return (
            <h1>Ocorreu um erro ao buscar os dados da conta. Tente mais tarde!</h1>
        )
    }
  
    return (
        <div className="place-items-center">
            <h1 className="text-3xl text-texto font-bold">Perfil</h1>
            <DadosConta usuario={usuario}/>
        </div>
    )
}

export default Conta