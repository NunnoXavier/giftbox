const Submenu = () => {
    return (
        <ul className='relative flex gap-24 justify-center items-center text-sm text-texto z-10'>
          <li className='group'>        
            <a href="#" className=' hover:text-zinc-200'>OCASIÕES</a>
            <ul className=' p-2 bg-neutral-100 bg-opacity-50 invisible absolute group-hover:visible hover:visible'>
              <li>
                <a href="/produtos/aniversario" className='  hover:text-zinc-200'>ANIVERSÀRIO</a>
              </li>
              <li>
                <a href="/produtos/maternidade" className='  hover:text-zinc-200'>MATERNIDADE</a>
              </li>
              <li>
                <a href="/produtos/boas+vindas" className='  hover:text-zinc-200'>BOAS VINDAS</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/giftbox" className='  hover:text-zinc-200'>GIFT BOX</a>
          </li>
          <li className='group'>
            <a className='  hover:text-zinc-200'>DATAS COMEMORATIVAS</a>
            <ul className=' p-2 bg-neutral-100 bg-opacity-50 invisible absolute group-hover:visible hover:visible'>
              <li>
                <a href="/produtos/maes" className='  hover:text-zinc-200'>DIA DAS MÃES</a>
              </li>
              <li>
                <a href="/produtos/pais" className='  hover:text-zinc-200'>DIA DOS PAIS</a>
              </li>
              <li>
                <a href="/produtos/namorados" className='  hover:text-zinc-200'>DIA DOS NAMORADOS</a>
              </li>
              <li>
                <a href="/produtos/natal" className='  hover:text-zinc-200'>NATAL</a>
              </li>
            </ul>              
          </li>
          <li>
            <a href="/sobre" className='  hover:text-zinc-200'>SOBRE</a>
          </li>
          <li>
            <a href="/contato" className='  hover:text-zinc-200'>FALE CONOSCO</a>
          </li>
        </ul>        
    )
}

export default Submenu