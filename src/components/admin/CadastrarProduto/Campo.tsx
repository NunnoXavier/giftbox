import { ChangeEvent, ReactNode } from "react"

type CampoProps = {
    name: string,
    className?:string, 
    type?: |'number'|'text'|'date'|'fone'|'password'|'file'
    inputType: |'input'|'textarea', 
    label?:string,
    children?: ReactNode,
    classWidth?:string,
    readOnly?: boolean,
    value?: string,
    step?: string
    onChange?: (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void
}

const Campo = ({
    name,
    className, 
    inputType, 
    label, 
    type, 
    classWidth,
    readOnly,
    value,
    step,
    onChange
}:CampoProps) => {
 return (
    <div className={`${className} bg-white flex gap-2`}>
        <label className="w-30 text-right text-gray-500">{label}</label>
        {
            inputType === "input"?
            (
                <input 
                    name={name}
                    type={type}
                    className={`${classWidth} border border-gray-200 rounded px-2`}
                    readOnly={readOnly}
                    step={step}
                    value={value}
                    onChange={onChange}
                    />
                ):
                (
                    <textarea rows={4}
                    name={name}
                    className="flex-1 border border-gray-200 rounded px-2"
                    readOnly={readOnly}
                    value={value}
                    onChange={onChange}
                    />                
            )
            
        }
    </div>    
 )    
}

export default Campo