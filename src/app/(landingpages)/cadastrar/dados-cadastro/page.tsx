import { actionCadastrarUsuario } from '@/actions/usuarios/actionCadastrarUsuario'
import FormDadosCadastro, { UserDto } from '@/components/DadosCadastro/FormDadosCadastro'
import { User } from '@/types/types'

const DadosCadastro = () => {

    const cadastrar = async ({ email, password, role, birthday, 
        firstName, lastName }:UserDto): Promise<{token: string}> => {        
        'use server'

        const usuario = {
            email,
            password,
            firstName,
            lastName,
            birthday,
            role
        }
        const authResp =  await actionCadastrarUsuario(usuario as User)
        if(!authResp) {
            return  { token: '' }
        }
 
        return authResp        
    }

    return (
        <div className="bg-transparent min-h-screen flex flex-col justify-center items-center p-10 text-center">
            <div className="bg-white border border-borda rounded-lg p-8 text-center place-center w-md shadow-md">
                <h1 className="text-xl text-texto m-2 font-bold">CADASTRO</h1>
                <FormDadosCadastro action={cadastrar} />
            </div>
        </div>
    )
}

export default DadosCadastro