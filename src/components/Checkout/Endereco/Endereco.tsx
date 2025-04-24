import { User } from "@/types/types"
import { cookies } from "next/headers"
import ModalAddEndereco from "./ModalAddEndereco"

const Endereco = async () => {
    const token = (await cookies()).get("SIGIFTBOX_AUTH_TOKEN")
    const res = await fetch('http://localhost:3000/api/usuarios',{
        method: 'GET',
        headers: { Cookie: `SIGIFTBOX_AUTH_TOKEN=${token?.value}` },        
    })

    if(res.status !== 200){
        console.log('erro ao buscar cadastro do usuário')
        return (<><h1>ocorreu um problema durante a leitura do banco de dados. Tente mais tarde.</h1></>)
    }
    
    const {data:usuario, error}: {data:User, error:string} = await res.json()
    
    if(!usuario){
        console.log(error)
        return (<><h1>ocorreu um problema durante a leitura do banco de dados. Tente mais tarde.</h1></>)
    }

    return (
        <div className="bg-white flex flex-col border border-gray-200 w-full rounded-md p-4">            
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
                <a href="/checkout?addEnd=open" className="pt-4 text-sm text-blue-700">Inserir/Alterar Endereço</a>
                <ModalAddEndereco/>
            </div>
        </div>
    )
}



export default Endereco