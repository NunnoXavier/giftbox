import { ReactNode } from "react"

const LayoutLogin = ( { children }: { children: ReactNode } ) => {
    return (
        <div className="">
            <div className="mx-auto max-w-[1600px] min-h-dvh z-0">
                {children}  
            </div>
        </div>
    )
}

export default LayoutLogin