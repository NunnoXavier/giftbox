import FormDadosCadastro from '@/components/DadosCadastro/FormDadosCadastro'

const DadosCadastro = () => {

    return (
        <div className="bg-transparent min-h-screen flex flex-col justify-center items-center p-10 text-center">
            <div className="bg-white border border-borda rounded-lg p-8 text-center place-center w-md shadow-md">
                <h1 className="text-xl text-texto m-2 font-bold">CADASTRO</h1>
                <FormDadosCadastro />
            </div>
        </div>
    )
}

export default DadosCadastro