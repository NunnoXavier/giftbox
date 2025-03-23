const Produto = async ({ params }:{ params: Promise<{ id:string }> }) => {
    const { id } = await params

    
    return <>
    <h1>ID produto: {id}</h1>
    </>
}

export default Produto