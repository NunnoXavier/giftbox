'use client'

import { AlertCircleIcon, TriangleAlert, CircleHelp } from "lucide-react";
import { ReactNode } from "react";

type ModalProps = {
    children?:ReactNode,
    type?: |'alert'|'confirmation'|'warning'|'error'|'none',
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
            <div className="fixed inset-0 bgtexto-label/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="absolute top-1/4 transform overflow-hidden rounded-lg bg-white text-left shadow-md transition-all sm:my-8 min-w-sm md:min-w-lg ">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div>
                                <div className={`${type==="none"? 'hidden':'block'} mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-borda-alerta sm:mx-0 sm:size-10`}>
                                    {                                    
                                        type === 'confirmation'? (<CircleHelp color="blue" strokeWidth={3}/>):
                                        type === 'warning'?      (<TriangleAlert color="yellow" strokeWidth={3}/>):
                                        type === 'error'?        (<TriangleAlert color="red" strokeWidth={3}/>):
                                                                (<AlertCircleIcon color="blue" strokeWidth={3}/>)

                                    }
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                                    <h3 className="text-base font-semibold text-texto" id="modal-title">{title}</h3>
                                    <div className="mt-2">
                                        <div className="text-sm text-texto-label">
                                            {children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            { buttons || "" }
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default Modal