import Menu from "@/components/Menu/Menu"
import { ReactNode } from "react"

const LayoutPublico = ( { children }: { children: ReactNode } ) => {
    return (
        <div>
            <Menu />
            <div className="mx-auto max-w-[1600px] min-h-dvh bg-white z-0">
                {children}  
            </div>
        </div>
    )
}

export default LayoutPublico