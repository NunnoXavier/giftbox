'use client'

import { ChangeEvent, ReactNode } from "react"

type CampoProps = {
    className?:string, 
    value?:string, 
    changeFunction?: (e:string) => void, 
    type?: |'number'|'text'|'date'|'fone'|'password'|'file'
    inputType: |'input'|'textarea', 
    label?:string,
    children?: ReactNode,
    classWidth?:string,
    readOnly?: boolean
}

const Campo = ({
    className, 
    value, 
    changeFunction, 
    inputType, 
    label, 
    type, 
    children, 
    classWidth,
    readOnly
}:CampoProps) => {
 return (
    <div className={`${className} flex gap-2`}>
        <label className="w-30 text-right text-gray-500">{label}</label>
        {
            inputType === "input"?
            (
                <input 
                    type={type} 
                    className={`${classWidth} border border-gray-200 rounded px-2`}
                    value={value}
                    onChange={(e) => changeFunction&& changeFunction(e.currentTarget.value)}
                    readOnly={readOnly}
                />
            ):
            (
                <textarea rows={4}
                    className="flex-1 border border-gray-200 rounded px-2"
                    value={value}
                    onChange={(e) => changeFunction && changeFunction(e.currentTarget.value)}
                    readOnly={readOnly}
                />                
            )
            
        }
        {children}
    </div>    
 )    
}

export default Campo