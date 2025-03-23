import { UserRound, ShoppingBag, Gift, Search } from 'lucide-react'
import { headers } from 'next/headers'
import Link from 'next/link';

export default async function Menu({ className }: { className?: string }){
  const headerList = await headers()
  const host = headerList.get('x-forwarded-host')
  const proto = headerList.get('x-forwarded-proto')

  return (
        <div className={`${className} p-4`}>
          <ul className="w-full grid grid-cols-3 items-center">
            <li>
              <Link href={ proto+'://'+host }>
                <img 
                  className='w-64'
                  src="/logo-texto.jpg"
                  alt="Logo"
                />
              </Link>
            </li>
            <li>
              <div className='flex border border-neutral-700 rounded-2xl h-9 px-2 content-center  w-full text-sm placeholder-zinc-200'>
                <input type="text" 
                    className='border-none focus:outline-none  w-full  text-sm '
                    placeholder="Buscar Produtos..."/>
                    <button><Search strokeWidth={1}/></button>
              </div>
            </li>
            <li>
              <div className='inline-flex flex-row justify-end gap-8 w-full'>
                <a href="#" className=' flex flex-col items-center hover:bg-gray-100'>
                <UserRound size={25}/>
                  <span className='text-sm '>perfil</span>
                </a>
                <a href="#" className=' flex flex-col items-center hover:bg-gray-100'>
                <Gift size={25} />
                  <span className='text-sm '>pedidos</span>
                </a>
                <a href="#" className=' flex flex-col items-center hover:bg-gray-100'>
                <ShoppingBag size={25}/>
                  <span className='text-sm '>sacola</span>
                </a>
              </div>
            </li>
          </ul>

          <ul className='flex gap-24 justify-center mt-10 items-center'>
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
    )
}
