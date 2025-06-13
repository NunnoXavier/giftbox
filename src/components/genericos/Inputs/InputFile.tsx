'use client'

import { useState } from "react"

const InputFile = ({ name, value }: { name: string, value?: string }) => {
    const [ fileName, setFileName ] = useState(value || 'clique aqui para selecionar o arquivo')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return
        setFileName(file.name)
    }

    return (
        <div className="border-2 border-borda rounded-md relative">
            <span className="absolute top-1/5 left-1 z-0">{ fileName }</span>
            <input 
                type="file"
                name={name} id={name}
                className="rounded-md p-2 opacity-0 z-10"                                 
                accept="image/png, image/jpg, image/jpeg, image/svg, image/webp, image/avif"                                    
                onChange={(e) => handleFileChange(e)}
                required
            />                                
        </div>

    )
}

export default InputFile