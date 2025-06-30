import { fetchPedidosAdmin } from "@/serverCache/fetchPedidosAdmin"
import { fetchPromocao, fetchPromocoes } from "@/serverCache/fetchPromocoes"
import { fetchEstoqueProdutos, fetchPrecoProdutos, fetchProduto, 
    fetchProdutos, fetchProdutosAdmin, fetchProdutosBusca } from "@/serverCache/fetchsProdutos"
import { fetchSecoes } from "@/serverCache/fetchsSecoes"
import { fetchUsuariosAdmin } from "@/serverCache/fetchUsuariosAdmin"
import { revalidateTag } from "next/cache"

const Admin = async () => {
    const produtos = await fetchProdutos()
    const produtosAdmin = await fetchProdutosAdmin()
    const estoqueProdutos = await fetchEstoqueProdutos()
    const pedidosAdmin = await fetchPedidosAdmin()
    const precoProdutos = await fetchPrecoProdutos()
    const promocoes = await fetchPromocoes()
    const secoes = await fetchSecoes()
    const usuariosAdmin = await fetchUsuariosAdmin()
    const produtosBusca = await fetchProdutosBusca()

    return (
        <div className="min-h-dvh w-dvw text-center">
            <h1 className="text-xl font-bold my-8">Admin Dashboard</h1>

            <div className="bg-white p-8 w-md md:w-2xl mx-auto rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-4">Dados - Tags</h2>
                <table className="w-full text-sm border-2 [&_td,&_th]:border ">
                    <thead className="bg-gray-600 text-white">
                        <tr>
                            <th>Tag</th>                            
                            <th>Status</th>
                            <th>Linhas</th>
                            <th>Acões</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TagTr tag="produtos" status={produtos? 'OK' : 'ERRO'} linhas={produtos?.length} />
                        {
                            produtosAdmin?.map(async produto => {
                                const produtoTag = `produto-${produto.id}`
                                const pro = await fetchProduto(produto.id!)
                                return (
                                    <TagTr key={produto.id} tag={produtoTag} status={pro? 'OK' : 'ERRO'} linhas={pro?1:0} />
                                )
                            })
                        }
                        <TagTr tag="produtos-admin" status={produtosAdmin? 'OK' : 'ERRO'} linhas={produtosAdmin?.length}/>
                        <TagTr tag="produtos-busca" status={produtosBusca? 'OK' : 'ERRO'} linhas={produtosBusca?.length}/>                        
                        <TagTr tag="estoque-produtos" status={estoqueProdutos? 'OK' : 'ERRO'} linhas={estoqueProdutos?.length}/>
                        <TagTr tag="preco-produtos" status={precoProdutos? 'OK' : 'ERRO'} linhas={precoProdutos?.length}/>
                        <TagTr tag="secoes" status={secoes? 'OK' : 'ERRO'} linhas={secoes?.length}/>
                        <TagTr tag="usuarios" status={usuariosAdmin? 'OK' : 'ERRO'} linhas={usuariosAdmin?.length}/>
                        {
                            usuariosAdmin?.map(usuario => (
                                <TagTr key={usuario.id} tag={`usuario-${usuario.id}`} status={usuario? 'OK' : 'ERRO'} linhas={usuario?1:0} />
                            ))
                        }
                        <TagTr tag="pedidos" status={pedidosAdmin? 'OK' : 'ERRO'} linhas={pedidosAdmin?.length}/>
                        {
                            pedidosAdmin?.map(pedido => (
                                <TagTr key={pedido.id} tag={`pedido-${pedido.id}`} status={pedido? 'OK' : 'ERRO'} linhas={pedido?1:0} />
                            ))
                        }
                        {
                            usuariosAdmin?.map(usuario => {
                                const pedidosUsuario = pedidosAdmin?.filter(pedido => pedido.idUser === usuario.id)
                                return (
                                    <TagTr key={usuario.id} tag={`pedidos-${usuario.id}`} status={pedidosUsuario? 'OK' : 'ERRO'} linhas={pedidosUsuario?.length} />
                                )
                            })
                        }
                        <TagTr tag="promocoes" status={promocoes? 'OK' : 'ERRO'} linhas={promocoes?.length}/>
                        {
                            promocoes?.map(async promocao => {
                                const promocaoTag = `promocao-${promocao.id}`
                                const promo = await fetchPromocao(promocao.id!)
                                return(
                                <TagTr key={promocao.id} tag={promocaoTag} status={promo? 'OK' : 'ERRO'} linhas={promocao?1:0} />
                                )
                            })
                        }
                    </tbody>
                </table>

            </div>

        </div>
    )
}

export default Admin


const TagTr = ({ tag, status, linhas }: { tag: string, status: string, linhas?: number}) => {
    return (
        <tr>
            <td>{tag}</td>
            <td>{status}</td>
            <td>{linhas || 0}</td>
            <td>                                
                <button className="text-red-600 font-bold py-2 px-4 rounded"
                    onClick={async () => {
                        'use server'
                        revalidateTag(tag)
                    }}
                >
                    Revalidar
                </button>
            </td>
        </tr>
    )
}