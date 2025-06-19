'use client'

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    className?: string;
    error?: boolean;
    setError?: (value: boolean) => void;
    setSucess?: (value: boolean) => void;
    sucess?: boolean;
    loading?: boolean;    
}

const Button = ({children, className, error, setError, sucess, setSucess, loading, ...rest}: ButtonProps) => {

    useEffect(() => {
        new Promise((resolve) => {
            setTimeout(() => {
              resolve(true)
            }, 3000)
          }).then(() => {
            setSucess && setSucess(false)
            setError && setError(false)
          })    
        }, [error, sucess])

    return (
            <button
              className={`min-w-30 h-10 rounded-lg text-white flex justify-center items-center 
                transition-all duration-700 ease-in-out
                ${  error ? 'bg-red-600 hover:bg-red-600' 
                  :sucess ? 'bg-green-600 hover:bg-green-600' 
                  : 'bg-texto2 hover:bg-borda2'}`}
              disabled={loading}              
              {...rest} 
            >
              {
                loading ? <Loader2 className="animate-spin" />
                :error ? <AlertCircle className="transition-all duration-1000 ease-in-out scale-110"/>
                :sucess ? <CheckCircle className="transition-all duration-1000 ease-in-out scale-110"/> 
                : children
              }
              
            </button>
    )
}

export default Button