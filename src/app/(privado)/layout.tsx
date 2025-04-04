import Menu from "@/components/Menu/Menu"
import { ReactNode } from "react"

const LayoutPrivado = ( { children }: { children: ReactNode } ) => {
    return (
        <div className="">
            <Menu className=""/>
            <div className="mx-auto max-w-[1600px] min-h-dvh bg-white p-4 z-0">
                {children}
            </div>
        </div>
    )
}

export default LayoutPrivado