'use client'
import { Product } from "@/types/types"
import { useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation" 

const GridProdutos = ({produtos}:{produtos:Product[]}) => {
    const linhas = useRef<HTMLDivElement>(null)
    const [ linhaSelecionada, setLinhaSelecionada ] = useState<EventTarget | null>(null)
    const router = useRouter()
    const searchParams = useSearchParams()
    
    const selecionar = async (e:EventTarget, produto:Product) => {    
        if(!produto.id){
            return
        }

        const params = new URLSearchParams(searchParams.toString())
        params.set('id',produto.id.toString())
        router.push(`/admin?${params.toString()}`);
        setLinhaSelecionada(e)
    }

    const alteraCorDaLinhaSelecionada = () => {
        if(linhas.current === null){
            return
        }else{
            for (let index = 0; index < linhas.current.children.length; index++) {
                const linha = linhas.current.children[index]
                if(linha === linhaSelecionada){
                    linha.classList.add('bg-cyan-200')
                    linha.classList.remove('odd:bg-gray-100')
                }else{
                    linha.classList.add('odd:bg-gray-100')
                    linha.classList.remove('bg-cyan-200')
                }                
            }
        }        
    }

    const irParaNovoProduto = () => {
        setLinhaSelecionada(null)
        const params = new URLSearchParams(searchParams.toString())        
        params.set('id','0')
        router.push(`/admin?${params.toString()}`);        
    }
 
    useEffect(() => {        
        alteraCorDaLinhaSelecionada()
    },[linhaSelecionada])


    return(
        <div className=" bg-white flex flex-col justify-between w-96 h-96 border border-gray-200 rounded-md">
            <div>
                <div className="flex flex-row font-bold text-gray-200 bg-cyan-700 pt-1 px-2 rounded-t-md">
                    <div className="w-1/10">ID</div>
                    <div className="w-5/10">Titulo</div>
                    <div className="w-4/10">Seção</div>
                </div>
                <div ref={linhas} className="w-95.5 h-max overflow-scroll text-gray-600">
                    {
                        produtos.map((produto) => (
                            <div key={produto.id} className="flex flex-row odd:bg-gray-100 px-2" 
                            onClick={(e) => selecionar(e.currentTarget,produto)}>
                                <div className="w-1/10">{produto.id}</div>
                                <div className="w-5/10">{produto.title}</div>
                                <div className="w-4/10">{produto.category?.description}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-end mb-2 mx-2">
                <button 
                    className="border border-gray-200 bg-gray-600 text-gray-200 rounded-xl px-2"
                    onClick={irParaNovoProduto}
                >
                    Novo Produto
                </button>
            </div>
        </div>
    )
}

export default GridProdutos