'use client'

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

/**
 * Defines the props for the Button component, extending standard HTML button attributes.
 * @param {ReactNode} children - The content to be displayed inside the button
 * @param {string} [className] - Optional additional CSS classes for styling
 * @param {boolean} [error] - Indicates if the button is in an error state
 * @param {(value: boolean) => void} [setError] - Optional function to update error state
 * @param {(value: boolean) => void} [setSucess] - Optional function to update success state
 * @param {boolean} [sucess] - Indicates if the button is in a success state
 * @param {boolean} [loading] - Indicates if the button is in a loading state
 */
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
    className?: string;
    error?: boolean;
    setError?: (value: boolean) => void;
    setSucess?: (value: boolean) => void;
    sucess?: boolean;
    loading?: boolean;    
}



/**
 * A customizable button component with support for loading, success, and error states. * 
 * @returns {JSX.Element} A button with dynamic visual states
 */
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
              className={`w-30 h-10 rounded-lg text-white flex justify-center items-center 
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