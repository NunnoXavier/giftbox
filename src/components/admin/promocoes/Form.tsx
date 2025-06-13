'use client'

import { Promocao } from "@/types/types"
import ButtonCriar from "./ButtonCriar"
import InputFile from "../../genericos/Inputs/InputFile"
import { useState } from "react"
import InputNumber from "@/components/genericos/Inputs/InputNumber"
import InputText from "@/components/genericos/Inputs/InputText"
import InputDate from "@/components/genericos/Inputs/InputDate"
import { toDateBr } from "@/services/utils"

const Form = ( { action, initialData }: { action: any, initialData?: Promocao } ) => {
    const [ loading, setLoading ] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(e.currentTarget)
            await action(formData)            
        } catch (error:any) {
            console.log(error.message)
        }finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
                <div className="flex flex-col items-start">
                    <label htmlFor="id">ID</label>
                    <InputNumber 
                        className="w-15 text-center p-2"
                        name="id" 
                        value={initialData?.id?.toString()||""} 
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="dataInicial">Data Inicial</label>
                    <InputDate 
                        className="w-full p-2"
                        name="dataInicial" 
                        value={initialData?.createdAt?.toString() || ""}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label htmlFor="dataFinal">Data Final</label>
                    <InputDate
                        className="w-full p-2"
                        name="dataFinal" 
                        value={initialData?.finalDate?.toString() || ""} 
                    />
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="nome">Nome</label>
                <InputText 
                    className="w-full p-2"
                    name="nome" 
                    value={initialData?.title} 
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="file">URL do Banner</label>
                <InputFile                    
                    name="file" 
                    value={initialData?.banner}
                />
            </div>
            <div className="flex flex-col gap-2">
                <ButtonCriar loading={loading} />
            </div>
        </form>
    )
}

export default Form