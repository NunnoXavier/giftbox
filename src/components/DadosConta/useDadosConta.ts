import { actionSalvarUsuario } from "@/actions/usuarios/actionSalvarUsuario"
import { apenasNumeros } from "@/services/useMask"
import { dateToISO } from "@/services/utils"
import { User } from "@/types/types"
import { FormEvent, useState } from "react"

const useDadosConta = ({usuario}: {usuario: User}) => {
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ sucess, setSucess ] = useState(false)

    const [cep, setCep] = useState(usuario.postalCode || '')
    const [endereco, setEndereco] = useState(usuario.address || '')
    const [cidade, setCidade] = useState(usuario.city || '')
    const [uf, setUf] = useState(usuario.state || '')

    const buscarEndereco = async () => {
      try {
          setLoading(true)
          
          const cepBusca = apenasNumeros(cep)
          const response = await fetch('http://localhost:3000/api/busca-cep?cep=' + cepBusca)
          const { data } = await response.json()
          setEndereco(data.logradouro)
          setCidade(data.localidade)
          setUf(data.uf)
          
      } catch (error:any) {
          console.log(error.message)
      } finally {
          setLoading(false)
      }
    }

    const salvar = async (e:FormEvent<HTMLFormElement>) => {        
      e.preventDefault()  
      try {            
            setLoading(true)
            const formData = new FormData(e.currentTarget)

            const firstName = formData.get('firstName') as string
            const lastName = formData.get('lastName') as string
            const birthday = formData.get('birthday') as string
            const phone = formData.get('phone') as string
            const address = formData.get('address') as string
            const city = formData.get('city') as string
            const state = formData.get('state') as string
            const obs = formData.get('obs') as string
            const cardNumber = formData.get('cardNumber') as string
            const cardExpire = formData.get('cardExpire') as string
            const cardCvv = formData.get('cardCvv') as string
            const cardHolderName = formData.get('cardHolderName') as string
            const cardHolderDoc = formData.get('cardHolderDoc') as string
            const postalCode = formData.get('postalCode') as string
            
            const dadosUsuario: User = {
                firstName,
                lastName,
                birthday: new Date(dateToISO(birthday)),
                phone,
                address,
                city,
                state,
                obs,
                cardNumber,
                cardExpire,
                cardCvv: Number(cardCvv),
                cardHolderName,
                cardHolderDoc,
                postalCode,
            }

            const salvou = await actionSalvarUsuario(dadosUsuario)
            if (!salvou) {
                setError(true)
            }           

            setSucess(true)

        } catch (error) {
            console.log(error)
            setError(true)
            return
        } finally {
            setLoading(false)
        }
    }    

    return {
        loading,
        error,
        sucess,
        setError,
        setSucess,
        salvar,
        buscarEndereco,
        cep,
        setCep,
        endereco,
        setEndereco,
        cidade,
        setCidade,
        uf,
        setUf,
    }
}

export  default useDadosConta