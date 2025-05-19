import Image from "next/image";

const Sobre = () => {

    return (
        <section className="bg-transparent text-texto px-6 py-20 max-w-7xl mx-auto space-y-24">
          {/* Bloco 1 - Introdução com destaque */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-extrabold text-texto2 mb-6">Muito além de uma caixa</h2>
              <p className="text-xl leading-relaxed">
                A <strong>Si Giftbox</strong> nasceu do nosso desejo de criar experiências memoráveis. Cada caixa é uma declaração de carinho, preparada com afeto, cuidado e estilo.
              </p>
            </div>
            <div>
              <Image src="/images/caixa-lilaz.jpg" alt="Giftbox" 
              className="rounded-xl shadow-lg" 
              width={500}
              height={500}
              />
            </div>
          </div>
    
          {/* Bloco 2 - Citação impactante */}
          <div className="bg-violet-50 p-12 rounded-lg text-center shadow-md">
            <p className="text-2xl italic text-texto2 max-w-3xl mx-auto">
              “Presentear é um gesto de amor — e cada detalhe importa. Nosso trabalho é transformar esse gesto em algo inesquecível.”
            </p>
          </div>
    
          {/* Bloco 3 - Por que escolher */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image src="/images/foto-sobre.webp" alt="Produtos selecionados" 
                className="rounded-xl shadow-lg" 
                width={500}
                height={500}
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-texto2">Por que escolher a Si Giftbox?</h3>
              <ul className="space-y-4 text-lg text-texto">
                <li>🎁 <strong>Design exclusivo</strong> – sofisticação em cada detalhe.</li>
                <li>🧡 <strong>Curadoria afetiva</strong> – produtos escolhidos com intenção.</li>
                <li>🎉 <strong>Datas especiais</strong> – aniversário, amor, maternidade ou gratidão.</li>
                <li>🏠 <strong>Negócio familiar</strong> – feito por nós, com amor.</li>
              </ul>
            </div>
          </div>
    
          {/* Bloco 4 - Redes sociais com destaque */}
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-texto2">Acompanhe nosso universo</h3>
            <p className="text-lg text-texto">Veja nossas inspirações, bastidores e novidades nas redes sociais:</p>
            <div className="flex justify-center space-x-6 mt-2">
              <a href="https://instagram.com/seuusuario" className="text-texto2 hover:underline text-lg">Instagram</a>
              <a href="https://facebook.com/seuusuario" className="text-texto2 hover:underline text-lg">Facebook</a>
              <a href="https://pinterest.com/seuusuario" className="text-texto2 hover:underline text-lg">Pinterest</a>
            </div>
          </div>
    
          {/* Bloco 5 - Contato final com toque pessoal */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-texto2">Fale com a gente</h3>
              <p className="text-lg text-texto">
                Queremos te ajudar a montar o presente perfeito. Entre em contato e vamos conversar!
              </p>
              <p className="text-texto">
                📧 <strong>contato@sigiftbox.com.br</strong><br />
                📱 WhatsApp: (xx) xxxxx-xxxx
              </p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-texto">✨ Com carinho,</p>
              <p className="text-texto2 font-bold text-2xl">Simone & Nunno</p>
            </div>
          </div>
        </section>
      );
};
      

export default Sobre