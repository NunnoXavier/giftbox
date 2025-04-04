import Produto from "@/components/Produto/Produto"

const PageProduto = async ({ params }:{ params: Promise<{ id:string }> }) => {
    const { id } = await params

    return (
        <div>
            <Produto id={id}/>
        </div>
    )
}

export default PageProduto