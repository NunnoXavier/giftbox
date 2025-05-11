import { Facebook, Instagram, Youtube } from "lucide-react"

const Redes = () => {
    return (
        <div className="flex gap-2">
            <b>Nos encontre nas Redes Sociais: </b>
            <a className="flex gap-2" href="https://instagram.com/si_giftbox"><Instagram /> Instagram</a>
            <a className="flex gap-2" href="https://facebook.com/si_giftbox"><Facebook /> Facebook</a>
            <a className="flex gap-2" href="https://youtube.com/si_giftbox"><Youtube /> Youtube</a>
        </div>
    )
}

export default Redes