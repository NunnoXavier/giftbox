import FormRecuperarSenha from "./components/FormRecuperarSenha"

const RecuperarSenha = ({email}: {email?: string}) => {

    return(
        <div className="bg-white border border-borda rounded-lg p-8 place-center w-md shadow-md">
            <h1 className="text-xl text-center font-bold text-texto m-4">Recuperar Senha</h1>
            <FormRecuperarSenha email={email} />
        </div>    
    )
}
    
export default RecuperarSenha
