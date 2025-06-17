import InputBase,{InputBaseProps} from "./InputBase"

type InputNumberProps = Omit<InputBaseProps, 'onHandleChange'> & {
    name: string
    value: string
    onChange?: (value: string) => void
}

const InputNumber = ({ onChange, className, ...rest }: InputNumberProps) => {
    
    const handleChange = (value: string) => {
        const newValue = value.replace(/\D/g, '')
        onChange ? onChange(newValue) : newValue
        return newValue
    }
    
    return (
        <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
            <InputBase 
                className="w-full h-full"
                type="number"
                onHandleChange={handleChange} 
                {...rest}
            />            
        </div>
    )
}

export default InputNumber