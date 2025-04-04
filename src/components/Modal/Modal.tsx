'use client'

import { AlertCircleIcon, TriangleAlert, CircleHelp } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";

type ModalProps = {
    children?:ReactNode,
    type?: |'alert'|'confirmation'|'warning'|'error',
    title?:string,
    show?: boolean,
    buttons?: ReactNode
}

const Modal = ({children, type, title, show, buttons }:ModalProps) => {

    return (
        <div 
            className={`${show? 'block':'hidden'} relative z-10`}
            aria-labelledby="modal-title" 
            role="dialog" 
            aria-modal="true"
        >
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                    {                                    
                                        type === 'confirmation'? (<CircleHelp color="blue" strokeWidth={3}/>):
                                        type === 'warning'?      (<TriangleAlert color="yellow" strokeWidth={3}/>):
                                        type === 'error'?        (<TriangleAlert color="red" strokeWidth={3}/>):
                                                                (<AlertCircleIcon color="blue" strokeWidth={3}/>)

                                    }
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-base font-semibold text-gray-900" id="modal-title">{title}</h3>
                                    <div className="mt-2">
                                        <div className="text-sm text-gray-500">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            { buttons || "" }
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default Modal