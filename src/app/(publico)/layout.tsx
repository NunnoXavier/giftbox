import Menu from "@/components/Menu/Menu"
import { ReactNode } from "react"

const LayoutPublico = ( { children }: { children: ReactNode } ) => {
    return (
        <div className="">
            <Menu className="mb-5"/>
            <div className="mx-auto max-w-[1600px] min-h-dvh z-0">
                {children}  
            </div>
        </div>
    )
}

export default LayoutPublico