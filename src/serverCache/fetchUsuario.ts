import { actionObterToken } from "@/actions/usuarios/actionObterToken"
import { User } from "@/types/types"
import { jwtDecode } from "jwt-decode"

const umDia = 60 * 60 * 24

export const fetchUsuario = async () => {
    const token = await actionObterToken()

    const res = await fetch('http://localhost:3000/api/usuarios', {
        cache: 'force-cache',
        headers: token.header,
        next: {
            tags: [`usuario-${token.idUser}`],
            revalidate: umDia
        }
    })

    const { data:usuario, error }:{data:User, error:string} = await res.json()
    if(!usuario){
        console.log(error)
        return
    }
    return usuario
}
