import { useState } from "react"
import InputBase, { InputBaseProps } from "./InputBase"
import { Eye, EyeOff } from "lucide-react"

type InputPasswordProps =  Omit<InputBaseProps, 'onHandleChange'> & {
    onChange?: (value: string) => void
}

const InputPassword = ({ onChange, className, ...rest }: InputPasswordProps) => {
    const [mostrarSenha, setMostrarSenha] = useState(false)
    
    const handleChange = (value: string) => {
        onChange && onChange(value)
        return value
    }
    
    return (
        <div className={`${className} flex justify-between items-center border-2 border-borda rounded-md`}>
        <InputBase
            className="w-full h-full"
            type={`${ mostrarSenha? 'text':'password' }`}
            onHandleChange={handleChange}            
            {...rest}
        />
            <button  
                type="button"  
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className=""
            >
                {
                    mostrarSenha?
                    (
                        <EyeOff className="text-texto-label"/>
                    )
                    :
                    (
                        <Eye className="text-texto-label"/>
                    )
                }
            </button>        
        </div>
    )
}

export default InputPassword