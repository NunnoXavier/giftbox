'use client'

import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react"
import { MouseEventHandler, useEffect, useRef, useState } from "react"

const Carrossel = ({ children, steps=1 }: { children: React.ReactNode, steps: number }) => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const stepsPerPage = steps * 200

    const updateScrollButtons = () => {
        const el = scrollRef.current
        if (!el) return

        setCanScrollLeft(el.scrollLeft > 0)
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth)
    }    

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        updateScrollButtons()

        el.addEventListener('scroll', updateScrollButtons)
        window.addEventListener('resize', updateScrollButtons)

        return () => {
            el.removeEventListener('scroll', updateScrollButtons)
            window.removeEventListener('resize', updateScrollButtons)
        }
    }, [])
    
    return (
        <div className="relative w-full px-4">
            <CarrosselButton className={`${canScrollLeft? 'block': 'hidden'} absolute left-1 top-1/2 -translate-y-1/2 z-10`}
            onClick={() => {
                    if(scrollRef.current){
                        scrollRef.current.scrollBy({left: stepsPerPage * -1, behavior: 'smooth'})
                    }
                }}
            >
                <ChevronLeftCircle className="h-full w-full"/>
            </CarrosselButton>
            <div
            ref={scrollRef}
                className="flex overflow-x-scroll gap-2 py-4 relative"
            >
                { children }
            </div>
            <CarrosselButton className={`${canScrollRight? 'block': 'hidden'} absolute right-1 top-1/2 -translate-y-1/2 z-10`}
            onClick={() => {
                    if(scrollRef.current){
                        scrollRef.current.scrollBy({left: stepsPerPage, behavior: 'smooth'})
                    }
                }}
            >
                <ChevronRightCircle className="h-full w-full"/>
            </CarrosselButton>
        </div>
    )
}

const CarrosselButton = ({ children, className, onClick }: { children?: React.ReactNode, className?: string, onClick?: MouseEventHandler<HTMLButtonElement>  }) => {
    return (
        <button
            className={`${className} bg-gray-600/20 hover:bg-gray-600/70 rounded-full w-10 h-10 flex items-center justify-center text-white`}
            onClick={onClick}
        >
            { children }
        </button>
    )
}

export default Carrossel