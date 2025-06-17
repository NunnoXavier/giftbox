import { toCurrencyBr } from "@/services/utils"
import InputBase, {InputBaseProps} from "./InputBase"
import { useState } from "react"

type InputNumberProps = Omit< InputBaseProps, 'onHandleChange' > & {
    onChange?: (value: string) => void
}

const InputCurrency = ({ className, onChange, name, ...rest }: InputNumberProps) => {
    const [rawValue, setRawValue] = useState('')

    const handleChange = (value:string) => {
        const input = value;
        setRawValue(input);
        const novoValor = toCurrencyBr(Number(input))
        onChange && onChange(novoValor)
        return novoValor
    };
    
    return (
        <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
            <InputBase
                name=""
                className="w-full h-full"
                type="text"
                inputMode="numeric"
                onHandleChange={handleChange}
                {...rest}            
            />
            <input type="hidden" name={name} id={name} value={rawValue} />
        </div>
    )
}

export default InputCurrency