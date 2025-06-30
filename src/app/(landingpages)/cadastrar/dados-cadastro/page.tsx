import FormDadosCadastro from '@/components/DadosCadastro/FormDadosCadastro'
import { Suspense } from 'react'

const DadosCadastro = () => {

    return (
        <div className="bg-white border border-borda rounded-lg p-8 text-center place-center w-md shadow-md">
            <h1 className="text-xl text-texto m-2 font-bold">CADASTRO</h1>
            <Suspense>
                <FormDadosCadastro />                        
            </Suspense>
        </div>
    )
}

export default DadosCadastro