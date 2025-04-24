'use client'

import { dinheiro } from "@/services/useMask"
import { useState } from "react"

const Teste = () => {
    const [valor, setValor] = useState(0)

    return (
        <>
        <input type="number" 
        className="border"
        value={valor}
        onChange={(e) => {
            const valorStr = dinheiro(e.currentTarget.value)
            setValor(Number(valorStr))
        }}
        />
        </>
    )
}

export default Teste