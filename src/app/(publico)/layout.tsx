import Menu from "@/components/Menu/Menu"
import { ReactNode } from "react"

const LayoutPublico = ( { children }: { children: ReactNode } ) => {
    return (
        <div>
            <Menu />
            {children}
        </div>
    )
}

export default LayoutPublico