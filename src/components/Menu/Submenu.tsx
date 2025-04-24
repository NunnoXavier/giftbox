const Submenu = () => {
    return (
        <ul className='flex gap-24 justify-center items-center text-sm text-gray-600'>
          <li className='group'>        
            <a href="#" className=' hover:text-zinc-200'>OCASIÕES</a>
            <ul className=' p-2 bg-neutral-100 bg-opacity-50 invisible absolute group-hover:visible hover:visible'>
              <li>
                <a href="#" className='  hover:text-zinc-200'>ANIVERSÀRIO</a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'>MATERNIDADE</a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'>BOAS VINDAS</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#" className='  hover:text-zinc-200'>GIFT BOX</a>
          </li>
          <li className='group'>
            <a href="#" className='  hover:text-zinc-200'>DATAS COMEMORATIVAS</a>
            <ul className=' p-2 bg-neutral-100 bg-opacity-50 invisible absolute group-hover:visible hover:visible'>
              <li>
                <a href="#" className='  hover:text-zinc-200'>DIA DAS MÃES</a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'>DIA DOS PAIS</a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'>DIA DOS NAMORADOS</a>
              </li>
              <li>
                <a href="#" className='  hover:text-zinc-200'>NATAL</a>
              </li>
            </ul>              
          </li>
          <li>
            <a href="#" className='  hover:text-zinc-200'>SOBRE</a>
          </li>
          <li>
            <a href="#" className='  hover:text-zinc-200'>FALE CONOSCO</a>
          </li>
        </ul>        
    )
}

export default Submenu