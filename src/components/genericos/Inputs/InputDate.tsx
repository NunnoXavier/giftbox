import InputBase,{InputBaseProps} from "./InputBase"

type InputDateProps = Omit<InputBaseProps, 'onHandleChange'> & {
    name: string
    onChange?: (value: string) => void
}

const InputDate = ({ onChange, className, ...rest }: InputDateProps) => {
    
    const handleChange = (value: string) => {
        const newValue = value//.replace(/\D/g, '')
        onChange ? onChange(newValue) : newValue
        return newValue
    }
    
    return (
        <div className={`${className} flex items-center justify-start relative border-2 border-borda rounded-md`}>
            <InputBase 
                className="w-full h-full"
                type="date"
                onHandleChange={handleChange}
                {...rest}
            />
        </div>
    )
}

export default InputDate