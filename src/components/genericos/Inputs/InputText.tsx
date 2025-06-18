import { useState } from "react"
import InputBase, { InputBaseProps } from "./InputBase"

type InputTextProps =  Omit<InputBaseProps, 'onHandleChange'> & {
    onChange?: (v: string) => void,
    mask?: (v: string) => string,
}

const InputText = ({ onChange, className, name, value, mask, state, ...rest }: InputTextProps) => {
    const [rawValue, setRawValue] = useState(value)

    const handleChange = (v: string) => {
        setRawValue(v)
        onChange && onChange(v)        
        const maskedValue = mask? mask(v) : v
        return maskedValue
    }
    
    return (
        <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
            <InputBase
                name={`${name}Formatado`}
                className="w-full h-full px-2 py-1"
                type="text"
                onHandleChange={handleChange}            
                value={mask? mask(value || "") : value}
                state={state}
                {...rest}
            />
            <input type="hidden" name={name} id={name} value={state || rawValue} />
        </div>
    )
}

export default InputText