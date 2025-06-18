import InputBase,{InputBaseProps} from "./InputBase"

type InputNumberProps = Omit<InputBaseProps, 'onHandleChange'> & {
    name: string
    value: string
    onChange?: (value: string) => void
    max?: number
}

const InputNumber = ({ onChange, className, max, ...rest }: InputNumberProps) => {
    
    const handleChange = (value: string) => {
        const newValue = value.replace(/\D/g, '')
        onChange ? onChange(newValue) : newValue
        return newValue
    }
    
    return (
        <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
            <InputBase 
                className="w-full h-full px-2 py-1"
                type="number"
                onHandleChange={handleChange} 
                max={max}
                {...rest}
            />            
        </div>
    )
}

export default InputNumber