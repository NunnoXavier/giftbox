import InputBase, { InputBaseProps } from "./InputBase"

type InputTextProps =  Omit<InputBaseProps, 'onHandleChange'> & {
    onChange?: (value: string) => void
}

const InputText = ({ onChange, className, ...rest }: InputTextProps) => {
    
    const handleChange = (value: string) => {
        onChange && onChange(value)
        return value
    }
    
    return (
        <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
            <InputBase
                className="w-full h-full"
                type="text"
                onHandleChange={handleChange}            
                {...rest}
            />
        </div>
    )
}

export default InputText