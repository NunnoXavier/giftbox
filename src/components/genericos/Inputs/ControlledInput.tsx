'use client'

type ControlledInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string,
    value: string | number
    setValueFn: (value: string) => void
}

const ControlledInput = ({className, value, setValueFn, ...rest}: ControlledInputProps) => {
    return (
        <input 
            className={`${className} border-2 border-borda rounded-lg px-2 py-1 w-full`}
            value={value}
            onChange={(e) => setValueFn(e.target.value)}
            {...rest}
        />
    )
}

export default ControlledInput