import ModalAddEndereco from "@/components/Checkout/Endereco/ModalAddEndereco"
import { User } from "@/types/types"

const Endereco = async ({usuario}:{usuario:User}) => {
    
    if(!usuario){
        return (<><h1>ocorreu um problema durante a leitura do banco de dados. Tente mais tarde.</h1></>)
    }

    return (
        <div className="bg-white flex flex-col border border-borda w-full rounded-md p-4 shadow-md">            
            <h1 className="font-bold">{`Entrega para ${usuario.firstName?.toLocaleUpperCase()} ${usuario.lastName?.toLocaleUpperCase()}`}</h1>
            <span className="flex-wrap">
                {`
                ${usuario.address? usuario.address : ''} 
                ${usuario.city? ', ' + usuario.city : ''} 
                ${usuario.state?.toLocaleUpperCase()? ' - ' + usuario.state.toLocaleUpperCase() : '' }
                 ${usuario.postalCode? ', ' + usuario.postalCode : ''} 
                 ${ usuario.obs? ' (' + usuario.obs + ') ' : ''}`}
            </span>
            <div className="flex gap-2 items-end">
                <a href="/checkout?addEnd=open" className="pt-4 text-sm text-texto-link">Inserir/Alterar Endereço</a>
                <ModalAddEndereco initialValue={usuario} />
            </div>
        </div>
    )
}



export default Endereco