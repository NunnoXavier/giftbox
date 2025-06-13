import { toCurrencyBr } from "@/services/utils"
import InputBase, {InputBaseProps} from "./InputBase"

type InputNumberProps = Omit< InputBaseProps, 'onHandleChange' > & {
    onChange?: (value: string) => void
}

const InputCurrency = ({ className, onChange, ...rest }: InputNumberProps) => {

    const formatarValor = (valorDigitado:string) => {
        // Remove tudo que não for número
        const numeros = valorDigitado.replace(/\D/g, '');

        // Garante pelo menos 3 dígitos para evitar erro de slice
        const valorComZero = numeros.padStart(3, '0');

        const centavos = valorComZero.slice(-2);
        const reais = valorComZero.slice(0, -2);

        const valorFormatado = `${Number(reais)}.${centavos}`.replace('.', ',');
        return valorFormatado;
    }

  const handleChange = (value:string) => {
    const input = value;
    const novoValor = formatarValor(input)
    onChange && onChange(novoValor)
    return novoValor
  };
    
    return (
        <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
            <InputBase 
                className="w-full h-full"
                type="text"
                inputMode="numeric"
                onHandleChange={handleChange}
                {...rest}            
            />
        </div>
    )
}

export default InputCurrency