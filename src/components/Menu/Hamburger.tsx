'use client'

import { Menu, ChevronDown, ChevronUp, UserRoundPlus, ChevronLeft, LogIn } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import AlertaSacola from './AlertaSacola'
import { User } from '@/types/types'
import Image from 'next/image'

const Hamburger = ({className, usuario}:{className?:string, usuario?:User}) => {
    const [open, setOpen] = useState(false)
    const [menuOcasioesOpen, setMenuOcasioesOpen] = useState(false)
    const [menuDatasOpen, setMenuDatasOpen] = useState(false)
    const menuRef = useRef<HTMLElement>(null)
    
    const clickFora = (event:MouseEvent) => {
        // Verifica se o clique foi fora do menu
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
    }
    
      // Adiciona o listener para clicar fora do menu quando o componente montar
    useEffect(() => {
        setOpen(false)
        setMenuOcasioesOpen(false)
        setMenuDatasOpen(false)
        // Adiciona o listener para o clique fora do menu
        document.addEventListener('mousedown', clickFora);

        // Remove o listener ao desmontar o componente
        return () => {
            document.removeEventListener('mousedown', clickFora);
        };
    }, [])

              

    return(
        <div className={`${className}`}>
            <div className="relative" onClick={() => setOpen(!open) }>            
                <AlertaSacola className="left-2.5 -top-1.5"/>
                <Menu className="z-1"/>
            </div>
            <aside ref={menuRef} className={`${open? 'w-96' : 'w-0'} fixed left-0 top-0 h-[100vh] bg-white transition-all duration-300 overflow-hidden z-20 shadow-md`}>
                <ChevronLeft 
                    className='absolute right-0 top-1 text-texto-label'
                    onClick={()=> setOpen(false)}
                />
                <div className='border-b border-borda my-4'>
                    <Image 
                        className='w-36'
                        src="/texto-sigiftbox.svg"
                        alt="Logo"
                        width={100}
                        height={100}
                    />
                {
                    usuario? 
                    (
                        <div className="flex gap-2 mt-4 mb-2 mx-2 justify-evenly">
                            <span className='justify-center items-center px-2 py-1'>
                                {`Olá, ${usuario.firstName}!`}
                            </span>                    
                            <a href="/dashboard" className='flex justify-center items-center gap-2 px-2 py-1'>
                                Sua página
                            </a>                    
                        </div>

                    )
                    :(
                        <div className="flex gap-2 mt-4 mb-2 mx-2 justify-evenly">
                            <a href="/login" className='flex flex-1 justify-center items-center gap-2 border bordertexto-label rounded-lg px-2 py-1'>
                                login
                                <LogIn size={20}/>
                            </a>                    
                            <a href="/cadastrar/verificar-email" className='flex flex-1 justify-center items-center gap-2 border bordertexto-label rounded-lg px-2 py-1'>
                                criar conta
                                <UserRoundPlus size={20}/>
                            </a>                    
                        </div>
                    )
                }

                </div>
                <div className='border-b border-borda my-4 pb-3 pl-4'>
                    <a href="/conta" className='flex align-bottom justify-between'>
                        <h1 className='text-xl text-texto'>Perfil</h1>
                    </a>
                </div>
                <div className='border-b border-borda my-4 pb-3 pl-4'>
                    <a href="/pedidos" className='flex align-bottom justify-between'>
                        <h1 className='text-xl text-texto'>Pedidos</h1>
                    </a>
                </div>
                <div className='border-b border-borda my-4 pb-3 pl-4'>                    
                    <a href="/sacola" className='flex align-bottom justify-between relative'>                        
                        <AlertaSacola className="translate-x-12"/>
                        <h1 className='text-xl text-texto relative'>Sacola</h1>
                    </a>
                </div>
                <div className='border-b border-borda my-4 pb-3 px-4 overflow-hidden'>
                    <a className='flex align-bottom justify-between'
                        onClick={() => setMenuOcasioesOpen(!menuOcasioesOpen) }
                    >
                        <h1 className='text-xl text-texto'>Ocasiões</h1>
                        {
                            menuOcasioesOpen? (<ChevronUp strokeWidth={1} size={30} />) : 
                                              (<ChevronDown strokeWidth={1} size={30} />)
                        }                        
                    </a>
                    <div className={`${menuOcasioesOpen? 'h-full opacity-100': 'h-0 opacity-0'} transition-all duration-300`}>
                        <div>
                            <a href="#" className='m-2'>Aniversário</a>
                        </div>
                        <div>
                            <a href="#" className='m-2'>Maternidade</a>
                        </div>
                        <div>
                            <a href="#" className='m-2'>Boas Vindas</a>
                        </div>                        
                    </div>
                </div>
                <div className='border-b border-borda my-4 pb-3 px-4 overflow-hidden'>
                    <a className='flex align-bottom justify-between'
                        onClick={() => setMenuDatasOpen(!menuDatasOpen) }
                    >
                        <h1 className='text-xl text-texto'>Datas Comemorativas</h1>
                        {
                            menuDatasOpen? (<ChevronUp strokeWidth={1} size={30} />) : 
                                              (<ChevronDown strokeWidth={1} size={30} />)
                        }                        
                    </a>
                    <div className={`${menuDatasOpen? 'h-full opacity-100': 'h-0 opacity-0'} transition-all duration-300`}>
                        <div>
                            <a href="#" className='m-2'>Dia das Mães</a>
                        </div>
                        <div>
                            <a href="#" className='m-2'>Dia dos Pais</a>
                        </div>
                        <div>
                            <a href="#" className='m-2'>Dia dos Namorados</a>
                        </div>                        
                        <div>
                            <a href="#" className='m-2'>Natal</a>
                        </div>                        
                    </div>
                </div>
                <div className='border-b border-borda my-4 pb-3 pl-4'>
                    <a href="/sobre" className='flex align-bottom justify-between'>
                        <h1 className='text-xl text-texto'>Sobre</h1>
                    </a>
                </div>
                <div className='border-b border-borda my-4 pb-3 pl-4'>
                    <a href="/contato" className='flex align-bottom justify-between'>
                        <h1 className='text-xl text-texto'>Fale Conosco</h1>
                    </a>
                </div>
                <div className='border-b border-borda my-4 pb-3 pl-4'>
                    <a href="/api/usuarios/logout" className='flex align-bottom justify-between'>
                        <h1 className='text-xl text-texto'>Sair</h1>
                    </a>
                </div>
            </aside>
        </div>
    )
}


export default Hamburger