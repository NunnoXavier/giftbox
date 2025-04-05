'use client'
import { Product, ProductCart } from "@/types/types"
import { ShoppingBag } from "lucide-react"
import { useEffect } from "react"

type BtnAddSacolaProps = {
    className?: string,
    produto?: Product
}

const BtnAddSacola = ({ produto, className }:BtnAddSacolaProps) => {
    
    const addSacola = async() => {
        const produtoSacola:ProductCart = {
            idProduct: produto?.id || 0,
            idUser: 0,
            qtde: 1,
        }
        console.log(produtoSacola)
        const res = await fetch('http://localhost:3000/api/usuarios/sacola',{
            method: 'PUT',
            body: JSON.stringify(produtoSacola)
        })
        const { data, error } = await res.json()
        if(!data){
            console.log(error)
        }else{
            console.log(data)
        }

    }
   
    return (
        <button 
            className={`${className} text-xs w-40 flex place-content-center bg-violet-400 text-white px-2 py-1 rounded-xl`}
            onClick={addSacola}
        >
            <ShoppingBag className="mr-2" size={15}/> 
            Adicionar à sacola
    </button>        
    )
}

export default BtnAddSacola