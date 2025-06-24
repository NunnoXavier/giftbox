const Placeholder = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <div className="relative place-items-center rounded-lg h-96 md:h-[620px] mb-4">
                <div className="absolute z-2 w-20 h-4 bg-borda top-2/12 md:top-44 left-4/12 -translate-1/2 md:-translate-y-0 rounded-md"></div>
                <div className="absolute z-2 w-46 h-46 bg-white top-6/12 left-1/2 -translate-1/2 rounded-full"></div>
                <div className="absolute z-4 w-40 h-40 bg-borda top-6/12  left-1/2 -translate-1/2 rounded-full"></div>
                <div className="absolute w-82 h-56 bg-borda top-6/12 left-1/2 -translate-1/2 rounded-lg">
                </div>
            </div>
            <div className="flex justify-center gap-2">
                <div className="relative md:h-20 h-[60px] rounded-lg w-20 shadow-md">
                    <div className="absolute z-2 w-5 h-1 bg-borda top-3/12 md:top-4/12  left-4/12 -translate-1/2 rounded-xs"></div>
                    <div className="absolute z-5 w-6 h-6 bg-white top-7/12 left-1/2 -translate-1/2 rounded-full"></div>
                    <div className="absolute z-6 w-5 h-5 bg-borda top-7/12 left-1/2 -translate-1/2 rounded-full"></div>
                    <div className="absolute w-15 h-8 bg-borda top-7/12 left-1/2 -translate-1/2 rounded-xs"></div>
                </div>
                <div className="relative md:h-20 h-[60px] rounded-lg w-20 shadow-md">
                    <div className="absolute z-2 w-5 h-1 bg-borda top-3/12 md:top-4/12  left-4/12 -translate-1/2 rounded-xs"></div>
                    <div className="absolute z-5 w-6 h-6 bg-white top-7/12 left-1/2 -translate-1/2 rounded-full"></div>
                    <div className="absolute z-6 w-5 h-5 bg-borda top-7/12 left-1/2 -translate-1/2 rounded-full"></div>
                    <div className="absolute w-15 h-8 bg-borda top-7/12 left-1/2 -translate-1/2 rounded-xs"></div>
                </div>
                <div className="relative md:h-20 h-[60px] rounded-lg w-20 shadow-md">
                    <div className="absolute z-2 w-5 h-1 bg-borda top-3/12 md:top-4/12  left-4/12 -translate-1/2 rounded-xs"></div>
                    <div className="absolute z-5 w-6 h-6 bg-white top-7/12 left-1/2 -translate-1/2 rounded-full"></div>
                    <div className="absolute z-6 w-5 h-5 bg-borda top-7/12 left-1/2 -translate-1/2 rounded-full"></div>
                    <div className="absolute w-15 h-8 bg-borda top-7/12 left-1/2 -translate-1/2 rounded-xs"></div>
                </div>
            </div>

        </div>        
    )
}

export default Placeholder