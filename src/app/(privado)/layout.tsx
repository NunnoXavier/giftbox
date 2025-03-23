import Menu from "@/components/Menu/Menu"
import { ReactNode } from "react"

const LayoutPrivado = ( { children }: { children: ReactNode } ) => {
    return (
        <div>
            <Menu />
            {children}
        </div>
    )
}

export default LayoutPrivado