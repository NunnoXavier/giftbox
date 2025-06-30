
import { UserRound, Gift, LogIn, UserRoundPlus, LogOut, ShoppingBag } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import BuscarProduto from '../BuscarProduto/BuscarProduto'
import MenuItem from './MenuItem'
import Hamburger from './Hamburger'
import AlertaSacola from './AlertaSacola'
import Submenu from './Submenu'
import { token as verificarToken } from './autenticar'
import Image from 'next/image'
import { fetchUsuario } from '@/serverCache/fetchUsuario'
 
export default async function Menu({ className }: { className?: string }){
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host')
  const proto = headerList.get('x-forwarded-proto')     
  await verificarToken()
  
  const usuario = await fetchUsuario()

  return (
    
    <div className={`${className} px-3`}>

      {/* menu mobile */}
      <div className='flex md:hidden justify-between mr-4 items-center'>
        <BuscarProduto mobile className=''/>
        <Link href={ proto+'://'+host }>
          <Image
            className='w-36'
            src="/logo-novo.svg"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>  
        <Hamburger usuario={usuario} />
      </div>
      {/* */}


      {/* menu tela grande */}
      <div className={`hidden md:block`}>
        <ul className="w-full flex justify-evenly items-end text-texto relative pb-4 px-30">
          <li className='w-40'>
            <Link href={ proto+'://'+host }>
              <Image 
                className='w-36 text-texto2 absolute -top-2'
                //src="/texto-sigiftbox.svg"
                src="/logo-novo.svg"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </li>
          <li className='flex-1 px-4'>
            <BuscarProduto className=''/>
          </li>
          <li className='w-max'>
            <div className='inline-flex flex-row justify-end w-full'>
              {
                usuario? (
                  <>
                    <MenuItem href="/dashboard" className='flex w-max px-2 justify-end'>
                      <h1 className='whitespace-nowrap text-xs'>{`Olá, ${usuario.firstName}`}</h1>
                      <h1 className='whitespace-nowrap '>Sua Página</h1>
                    </MenuItem>
                    <div className='flex'>
                      <MenuItem href="/conta" label='perfil'>
                        <UserRound size={25}/>            
                      </MenuItem>
                      <MenuItem href="/pedidos" label='pedidos'>
                        <Gift size={25} />
                      </MenuItem>
                      <MenuItem className="relative" href="/sacola" label='sacola'>
                        <AlertaSacola className="-top-1 translate-x-2"/>
                        <ShoppingBag className="z-1" size={25} />
                      </MenuItem>
                      <MenuItem  href="/api/usuarios/logout" label='Sair'>
                        <LogOut size={25}/>
                      </MenuItem>

                    </div>
                  </>
                ):
                (
                  <>
                    <MenuItem href="/cadastrar/verificar-email" label='Criar Conta'>
                      <UserRoundPlus size={25}/>
                    </MenuItem>
                    <MenuItem className="relative" href="/sacola" label='sacola'>
                      <AlertaSacola className="-top-1 translate-x-2"/>
                      <ShoppingBag className="z-1" size={25} />
                    </MenuItem>        
                    <MenuItem href="/login" label='Login'>
                      <LogIn size={25}/>
                    </MenuItem>
                  </>
                )
              }
            </div>
          </li>
        </ul>

        <Submenu />

      </div>
      {/*  */}
    </div>

  )
}


