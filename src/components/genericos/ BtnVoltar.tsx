'use client'

const BtnVoltar = ({ children }: { children?: React.ReactNode }) => {
    return (
        <span className="text-texto-link hover:underline" onClick={() => window.history.back()}>
            { children }    
        </span>
    )
}

export default BtnVoltar