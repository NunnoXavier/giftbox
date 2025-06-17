'use client'

import { useState } from "react"

export type InputBaseProps = {
    className?: string
    name: string
    value?: string
    type?: string
    inputMode?: 'text' | 'numeric' | 'decimal'
    onHandleChange?: (value: string) => string
    onBlur?: (value: string) => void
    placeHolder?: string
    disabled?: boolean
}

const InputBase = ({ className, name, value, type, onHandleChange, inputMode, placeHolder, onBlur, disabled }: InputBaseProps) => {
    const [text, setText] = useState(value || '')
   
    const handleChange = (value: string) => {
        const newValue = onHandleChange ? onHandleChange(value) : value
        setText(newValue)
    }

    const handleBlur = () => {
        if(onBlur) onBlur(text)
    }

    return (
        <input
            className={`${className}`}            
            value={text}
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