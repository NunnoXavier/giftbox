const Produto = async ({ params }:{ params: { id:string } }) => {
    const { id } = await params

    
    return <>
    <h1>ID produto: {id}</h1>
    </>
}

export default Produto