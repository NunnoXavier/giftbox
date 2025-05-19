'use client'

import { useEffect, useState } from "react";

type InterruptorProps = {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}

const Interruptor = ({ checked, onChange }:InterruptorProps) => {
    const [isChecked, setIsChecked] = useState(checked || false);

    useEffect(() => {
        setIsChecked(checked || false);
    }, []);

    const handleToggle = async() => {
        onChange && onChange(!isChecked)
        setIsChecked(!isChecked)

    };

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="interruptor" className="cursor-pointer">
                <div className={`flex ${isChecked? 'justify-end bg-borda2':'justify-start bg-borda' } w-14 h-7 rounded-full items-center p-1`}>
                    <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300"></div>
                </div>
            </label>
            <input type="checkbox" 
                id="interruptor" 
                className="hidden"  
                checked={isChecked} 
                onChange={ handleToggle } 
            />
        </div>
    )
}

export default Interruptor