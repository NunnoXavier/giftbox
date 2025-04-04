
const PlaceholderSecoes = () => {
    const array = [0,1,2]
    const array2 = [0,1,2,3,4]
    
    return (
        <div>
            <ul>
                {
                    array.map((n) => {
                        
                        return (
                            <div key={n}>
                                <div className="p-4 animate-pulse">
                                    <div className="bg-gray-300 rounded-2xl m-auto w-1/6 h-6 my-3"></div>
                                    <div className="flex flex-wrap gap-2 place-content-center">
                                        {
                                            array2.map((n)=> {
                                                return(
                                                    <div key={n} className="w-60 justify-items-center py-2 text-center break-words border border-gray-200">
                                                        <div className="">
                                                            <div className="w-40 h-40 bg-gray-200"></div>
                                                        </div>
                                                    
                                                        <div className="bg-gray-300 w-32 h-3 rounded-2xl my-2"></div>
                                                        <div className="bg-gray-300 w-24 h-4 rounded-2xl my-2"></div>
                                                        <div className="bg-gray-200 w-32 h-3 rounded-2xl my-2"></div>
                                                    </div>
                                                )
                                                
                                            })
                                        }
                                    </div>
                                </div>                                
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )

}

export default PlaceholderSecoes