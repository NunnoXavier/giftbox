import Menu from "@/components/Menu/Menu"
import { ReactNode } from "react"

const LayoutPrivado = ( { children }: { children: ReactNode } ) => {
    return (
        <div className="p-2">
            <Menu />
            <div className="max-w-96">
                {children}
            </div>
        </div>
    )
}

export default LayoutPrivado