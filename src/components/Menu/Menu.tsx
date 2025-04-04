import { UserRound, ShoppingBag, Gift, LogIn, UserRoundPlus, LogOut } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link'
import BuscarProduto from '../BuscarProduto/BuscarProduto'
import MenuItem from './MenuItem'
import Hamburger from './Hamburger'

export default async function Menu({ className }: { className?: string }){
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host')
  const proto = headerList.get('x-forwarded-proto')

  return (
    
    <div className={`${className} px-3`}>

      {/* menu mobile */}
      <div className='flex md:hidden justify-between mr-4 items-center'>
        <BuscarProduto mobile className=''/>
        <Link href={ proto+'://'+host }>
          <img 
            className='w-36'
            src="/texto-sigiftbox.svg"
            alt="Logo"
          />
        </Link>  
        <Hamburger />
      </div>
      {/* */}


      {/* menu tela grande */}
      <div className={`hidden md:block`}>
        <ul className="w-full flex justify-evenly items-center">
          <li>
            <Link href={ proto+'://'+host }>
              <img 
                className='w-36'
                src="/texto-sigiftbox.svg"
                alt="Logo"
              />
            </Link>
          </li>
          <li>
            <BuscarProduto />
          </li>
          <li>
            <div className='inline-flex flex-row justify-end w-full'>
              <MenuItem href="/conta" label='perfil'>
                <UserRound size={25}/>            
              </MenuItem>
              <MenuItem href="/cadastrar" label='Criar Conta'>
                <UserRoundPlus size={25}/>
              </MenuItem>
              <MenuItem href="/pedidos" label='pedidos'>
                <Gift size={25} />
              </MenuItem>
              <MenuItem href="/sacola" label='sacola'>
                <ShoppingBag size={25}/>
              </MenuItem>
              <MenuItem href="/login" label='Login'>
                <LogIn size={25}/>
              </MenuItem>
              <MenuItem href="/api/usuarios/logout" label='Sair'>
                <LogOut size={25}/>
              </MenuItem>
            </div>
          </li>
        </ul>

        <ul className='flex gap-24 justify-center items-center'>
          <li className='group'>        
            <a href="#" className=' hover:text-zinc-200'><strong>OCASIÕES</strong></a>
            <ul className=' p-2 bg-neutral-100 bg-opacity-50 invisible absolute group-hover:visible hover:visible'>
              <li>
                <a href="#" className='  hover:text-zinc-200'><strong>ANIVERSÀRIO</strong></a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'><strong>MATERNIDADE</strong></a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'><strong>BOAS VINDAS</strong></a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className='  hover:text-zinc-200'><strong>GIFT BOX</strong></a>
          </li>
          <li className='group'>
            <a href="#" className='  hover:text-zinc-200'><strong>DATAS COMEMORATIVAS</strong></a>
            <ul className=' p-2 bg-neutral-100 bg-opacity-50 invisible absolute group-hover:visible hover:visible'>
              <li>
                <a href="#" className='  hover:text-zinc-200'><strong>DIA DAS MÃES</strong></a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'><strong>DIA DOS PAIS</strong></a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'><strong>DIA DOS NAMORADOS</strong></a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'><strong>NATAL</strong></a>
              </li>
            </ul>              
          </li>
          <li>
            <a href="#" className='  hover:text-zinc-200'><strong>SOBRE</strong></a>
          </li>
          <li>
            <a href="#" className='  hover:text-zinc-200'><strong>FALE CONOSCO</strong></a>
          </li>
        </ul>
      </div>
      {/*  */}
    </div>

  )
}
