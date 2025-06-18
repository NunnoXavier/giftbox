'use client'

import { useEffect, useState } from "react"

export type InputBaseProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
    className?: string
    name: string
    value?: string
    type?: string
    inputMode?: 'text' | 'numeric' | 'decimal'
    onHandleChange?: (value: string) => string
    onBlur?: (value: string) => void
    placeHolder?: string
    disabled?: boolean
    state?: string
    setStateFn?: (v: string) => void
}

const InputBase = ({ className, name, state,setStateFn, value, type, onHandleChange, inputMode, placeHolder, onBlur, disabled }: InputBaseProps) => {
    const [text, setText] = useState(value || '')

    useEffect(() => {
        setStateFn && setStateFn(value || '')
    }, [])
   
    const handleChange = (value: string) => {
        const newValue = onHandleChange ? onHandleChange(value) : value
        setStateFn && setStateFn(newValue)
        setText(newValue)
    }

    const handleBlur = () => {
        if(onBlur) onBlur(text)
    }

    return (
        <input
            className={`${className}`}            
            value={state || text}
            name={name} id={name}
            onChange={(e) => handleChange(e.target.value)}
            type={type}
            inputMode={inputMode}
            placeholder={placeHolder}
            onBlur={handleBlur}
            disabled={disabled}
        />
    )
}

export default InputBase