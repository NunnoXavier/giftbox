import FormVerificarEmail from '@/components/VerificarEmail/FormVerificarEmail'

const VerificarEmail = () => {

    return (
        <div className="bg-transparent min-h-screen flex flex-col justify-center items-center p-10 text-center">
            <div className="bg-white border border-borda rounded-lg p-8 text-center place-center w-md shadow-md">
                <h1 className="text-xl text-texto m-2 font-bold">VERIFICAR EMAIL</h1>
                <FormVerificarEmail />
            </div>
        </div>
    )
}

export default VerificarEmail