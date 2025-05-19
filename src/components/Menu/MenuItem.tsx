import { ReactNode } from "react"

type MenuItemProps = { 
    href?:string, 
    className?:string, 
    children?:ReactNode,
    label?:string
}

const MenuItem = ({ href, className, children, label }:MenuItemProps) => {
    return (
        <a href={href} className={`${className} flex flex-col items-center w-24 rounded-lg hover:bg-texto2 hover:text-white`}>
        {children}
          <span className='text-sm '>{label}</span>
        </a>        
    )
}

export default MenuItem