import Contato from "./Contato"
import Redes from "./Redes"

const Rodape = () => {
    return (
        <footer className="z-20 flex flex-col justify-center items-center gap-4 bg-texto text-white py-4 px-10">
            <Contato />
            <Redes />
            <div className="flex gap-2">
                <span className="text-sm">© 2024 Si Giftbox M.E. Todos os direitos reservados.</span>
            </div>
        </footer>
    )
}

export default Rodape